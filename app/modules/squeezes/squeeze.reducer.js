import moment from 'moment';
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';


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
