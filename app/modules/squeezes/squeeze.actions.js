import moment from 'moment';
import * as types from '../../constants/actionTypes';

const delay = (ms) => new Promise(resolve =>
    setTimeout(resolve, ms)
);

export function setDailySessions(sessions: Number) :Object {
    return {
        type: types.SET_DAILY_SESSIONS,
        dailySessions: sessions,
    };
}

export function longResultsDidUpdate(identifier, results) {
    return (dispatch, getState) => {
        dispatch(
            updateLongResults(identifier, results)
        );
        return delay(1000).then(() => {
            const { squeezes } = getState();
            const { squeezeDays } = squeezes;
            const squeezeDay = squeezeDays[identifier];
            const id = moment(squeezeDay.date).startOf('day').unix();
            const percentage = squeezeDay.percentage;
            dispatch(
                { type: types.SQUEEZE_PERCENT_UPDATED, id, percentage }
            );
        });
    };
}

export function shortResultsDidUpdate(identifier, results) {
    return (dispatch, getState) => {
        dispatch(
            updateShortResults(identifier, results)
        );
        return delay(1000).then(() => {
            const { squeezes } = getState();
            const { squeezeDays } = squeezes;
            const squeezeDay = squeezeDays[identifier];
            const id = moment(squeezeDay.date).startOf('day').unix();
            const percentage = squeezeDay.percentage;
            dispatch(
                { type: types.SQUEEZE_PERCENT_UPDATED, id, percentage }
            );
        });
    };
}

function updateLongResults(identifier, results) {
    return {
        type: types.SET_LONG_RESULTS,
        id: identifier,
        longDone: results
    };
}

function updateShortResults(identifier, results) {
    return {
        type: types.SET_SHORT_RESULTS,
        id: identifier,
        shortDone: results
    };
}

export function setSelectedIndex(index) {
    return {
        type: types.SET_SELECTED_INDEX,
        selectedIndex: index
    };
}
