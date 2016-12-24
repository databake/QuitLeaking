import moment from 'moment';
import { 
  DEFAULT_DONE, 
  DEFAULT_GOAL, 
  DEFAULT_REPS, 
  DEFAULT_INTERVAL 
} from '../constants/constants';

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

const defaultLeakageDays = () => {
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
      inVolume: 0,
      outVolume: 0,
      percentage: 0,
    });
  }
  return daysArray;
};

export default {
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
  leakage: {
    leakageWeek: defaultLeakageDays(),
    leakageSelectedIndex: today.weekday(),
  }
};
