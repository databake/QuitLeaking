import moment from 'moment';
import * as types from '../../constants/actionTypes';

const today = moment().startOf('day');

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

const initialState = {
    leakage: {
        leakageWeek: defaultLeakageDays(),
        leakageSelectedIndex: today.weekday(),
    }
};

const updateOutVolume = (state, action) => state.map((measurement) => {
    if (action.id !== measurement.id) {
        return measurement;
    }
    return {
        ...measurement,
        outVolume: action.volume,
        percentage: percentageCalc(measurement.inVolume, action.volume)
    };
});

const updateInVolume = (state, action) => state.map((measurement) => {
    if (action.id !== measurement.id) {
        return measurement;
    }
    return {
        ...measurement,
        inVolume: action.volume,
        percentage: percentageCalc(action.volume, measurement.outVolume)
    };
});

const percentageCalc = (inVolume, outVolume) => {
    if (inVolume === 0) {
        return 0;
    }
    return outVolume / inVolume;
};


export default function (state = initialState.leakage, action) {
    switch (action.type) {
        case types.GET_LEAKAGE_DATA: {
            return state;
        }
        case types.SET_IN_VOLUME: {
            const week = updateInVolume(state.leakageWeek, action);
            return { ...state, leakageWeek: week };
        }
        case types.SET_OUT_VOLUME: {
            const week = updateOutVolume(state.leakageWeek, action);
            return { ...state, leakageWeek: week };
        }
        default: {
            return state;
        }
    }
}
