import * as types from '../../constants/actionTypes';

export function leakPercentDidUpdate(id, percentage) {
    return {
        type: types.LEAK_PERCENT_UPDATED,
        id,
        percentage
    };
}

export function squeezePercentDidUpdate(id, percentage) {
    return {
        type: types.SQUEEZE_PERCENT_UPDATED,
        id,
        percentage
    };
}
