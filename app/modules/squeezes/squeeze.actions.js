
import * as types from '../../constants/actionTypes';

export function setDailySessions(sessions: Number) :Object {
    return {
        type: types.SET_DAILY_SESSIONS,
        dailySessions: sessions,
    };
}

export function updateLongResults(identifier, results) {
    return {
        type: types.SET_LONG_RESULTS,
        id: identifier,
        longDone: results
    };
}

export function updateShortResults(identifier, results) {
    return {
        type: types.SET_SHORT_RESULTS,
        id: identifier,
        shortDone: results
    };
}
