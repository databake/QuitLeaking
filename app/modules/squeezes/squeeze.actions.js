import * as types from '../../constants/actionTypes';

export function setLongInterval(interval) {
    return {
        type: types.SET_LONG_INTERVAL,
        longInterval: interval,
    };
}

export function setLongRepetitions(repetitions) {
    return {
        type: types.SET_LONG_REPETITIONS,
        longRepetitions: repetitions,
    };
}

export function setShortRepetitions(repetitions) {
    return {
        type: types.SET_SHORT_REPETITIONS,
        shortRepetitions: repetitions,
    };
}

export function setDailySessions(sessions) {
    return {
        type: types.SET_DAILY_SESSIONS,
        dailySessions: sessions,
    };
}
