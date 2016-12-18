import moment from 'moment';

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
      longGoal: 3,
      shortGoal: 3,
      longDone: [false, false, false],
      shortDone: [false, false, false],
      percentage: 0
    });
  }
  return daysArray;
};

export default {
  squeezes: {
    config: {
      longInterval: 10,
      longRepetitions: 10,
      shortRepetitions: 10,
      dailySessions: 3,
    },
    thisWeeksSqueezes: dafaultSqueezeDays(),
    selected: {
      dayIndex: today.weekday(),
      weekIndex: today.week(),
      yearIndex: today.year(),
    },
    selectedIndex: today.weekday(),
    selectedWeek: today.week(),
    selectedYear: today.year()
  }
};
