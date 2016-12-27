import * as types from '../../constants/actionTypes';

export function getLeakageData() {
    return {
        type: types.GET_LEAKAGE_DATA,
    };
}

export function updateInVolume(volume, identifier) {
    return {
        volume,
        id: identifier,
        type: types.SET_IN_VOLUME,
    };
}

export function updateOutVolume(volume, identifier) {
    return {
        volume,
        id: identifier,
        type: types.SET_OUT_VOLUME,
    };
}

export function setSelectedIndex(index) {
    return {
        type: types.SET_SELECTED_INDEX,
        selectedIndex: index
    };
}
