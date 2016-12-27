import moment from 'moment';
import { 
  DEFAULT_DONE, 
  DEFAULT_GOAL, 
  DEFAULT_REPS, 
  DEFAULT_INTERVAL 
} from '../../constants/constants';
import * as types from '../../constants/actionTypes';

const today = moment().startOf('day');

export const dafaultSqueezeDays = () => {
  const dayIndex = today.weekday();
  let index;
  const daysArray = [];
  for (index = 0; index < 7; index++) {
    let newDate;
    if ((index - dayIndex) < 0) {
      newDate = moment().subtract(((index - dayIndex) / -1), 'd');
    } else {
      newDate = moment().add(index - dayIndex, 'd');
    }
    daysArray.push({
      id: index,
      date: newDate.startOf('day'),
      longGoal: DEFAULT_GOAL,
      shortGoal: DEFAULT_GOAL,
      longDone: DEFAULT_DONE,
      shortDone: DEFAULT_DONE,
      percentage: 0
    });
  }
  return daysArray;
};

const initialState = {
    squeezes: {
        config: {
            longInterval: DEFAULT_INTERVAL,
            longRepetitions: DEFAULT_REPS,
            shortRepetitions: DEFAULT_REPS,
            dailySessions: DEFAULT_GOAL,
        },
        squeezeDays: dafaultSqueezeDays(),
        selected: {
            dayIndex: today.weekday(),
            weekIndex: today.week(),
            yearIndex: today.year(),
        },
    },
};

const updateShortSqueeze = (state, action) => state.map((squeeze) => {
    if (action.id !== squeeze.id) {
        return squeeze;
    }
    return {
        ...squeeze,
        shortDone: action.shortDone,
        percentage: percentageCalc(action.shortDone, squeeze.longDone, squeeze.shortGoal * 2)
    };
});

const updateLongSqueeze = (state, action) => state.map((squeeze) => {
    if (action.id !== squeeze.id) {
        return squeeze;
    }
    return {
        ...squeeze,
        longDone: action.longDone,
        percentage: percentageCalc(action.longDone, squeeze.shortDone, squeeze.shortGoal * 2)
    };
});

const percentageCalc = (longDone, shortDone, goal = 1) => {
    const longSum = longDone.reduce((previous, number) => (previous + number), 0);
    const shortSum = shortDone.reduce((previous, number) => (previous + number), 0);
    return (longSum + shortSum) / goal;
};

export default function (state = initialState.squeezes, action) {
    switch (action.type) {
        case types.SET_DAILY_SESSIONS: {
            const configCopy = { ...state.config, dailySessions: action.dailySessions };
            return { ...state, config: configCopy };
        }
        case types.SET_LONG_RESULTS: {
            const sq = updateLongSqueeze(state.squeezeDays, action);
            return { ...state, squeezeDays: sq };
        }
        case types.SET_SHORT_RESULTS: {
            const sq = updateShortSqueeze(state.squeezeDays, action);
            return { ...state, squeezeDays: sq };
        }
        case types.SET_SELECTED_INDEX: {
            const newDate = moment(state.squeezeDays[action.selectedIndex].date);
            const selectedCopy = {
                ...state.selected,
                dayIndex: newDate.weekday(),
                weekIndex: newDate.week(),
                yearIndex: newDate.year(),
            };
            return { ...state, selected: selectedCopy };
        }
        default:
            return state;
    }
}
