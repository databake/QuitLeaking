import moment from 'moment';
import * as types from '../../constants/actionTypes';

const delay = (ms) => new Promise(resolve =>
    setTimeout(resolve, ms)
);

export function getLeakageData() {
    return {
        type: types.GET_LEAKAGE_DATA,
    };
}

export function volumeInDidUpdate(volume, identifier, date) {
    return (dispatch, getState) => {
        dispatch(
            updateInVolume(volume, identifier, date)
        );
        return delay(1000).then(() => {
            const id = moment(date).startOf('day').unix();
            const { leakage } = getState();
            const percentage = leakage.leakageWeek[identifier].percentage;
            dispatch(
                { type: types.LEAK_PERCENT_UPDATED, id, percentage }
            );
        });
    };
}

export function volumeOutDidUpdate(volume, identifier, date) {
    return (dispatch, getState) => {
        dispatch(
            updateOutVolume(volume, identifier, date)
        );
        return delay(1000).then(() => {
            const id = moment(date).startOf('day').unix();
            const state = getState();
            const percentage = state.leakage.leakageWeek[identifier].percentage;
            dispatch(
                { type: types.LEAK_PERCENT_UPDATED, id, percentage }
            );
        });
    };
}

export function setSelectedIndex(index) {
    return {
        type: types.SET_SELECTED_INDEX,
        selectedIndex: index
    };
}

export function didUpdatePercentage(date, percentage) {
    return (dispatch) => {
        dispatch({ type: 'LEAK_PERCENT_UPDATED', id: date, percentage });
    };
}

function updateInVolume(volume, identifier, date) {
    return {
        date,
        volume,
        id: identifier,
        type: types.SET_IN_VOLUME,
    };
} 

function updateOutVolume(volume, identifier, date) {
    return {
        volume,
        date,
        id: identifier,
        type: types.SET_OUT_VOLUME,
    };
}

