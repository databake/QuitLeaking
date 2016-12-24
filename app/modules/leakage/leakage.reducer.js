// import moment from 'moment';
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

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
