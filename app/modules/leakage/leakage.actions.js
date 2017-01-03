import * as types from '../../constants/actionTypes';
import { INPUT_TYPE } from '../../constants/constants';

const delay = (ms) => new Promise(resolve =>
    setTimeout(resolve, ms)
);

export function getLeakageData() {
    return {
        type: types.GET_LEAKAGE_DATA,
    };
}

export function volumeDidUpdate(volume, id, type = INPUT_TYPE) {
    return (dispatch, getState) => {
        if (type === INPUT_TYPE) {
            dispatch(updateInVolume(volume, id));
        } else {
            dispatch(updateOutVolume(volume, id));
        }
        return delay(1000).then(() => {
            const { leakage } = getState();
            const { leakageWeek } = leakage;
            const leakDay = leakageWeek.filter((e) => e.id === id)[0];
            if (leakDay) {
                const percentage = leakDay.percentage;
                dispatch(
                    { type: types.LEAK_PERCENT_UPDATED, id, percentage }
                );
            }
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

function updateInVolume(volume, identifier) {
    return {
        volume,
        id: identifier,
        type: types.SET_IN_VOLUME,
    };
} 

function updateOutVolume(volume, identifier) {
    return {
        volume,
        id: identifier,
        type: types.SET_OUT_VOLUME,
    };
}

