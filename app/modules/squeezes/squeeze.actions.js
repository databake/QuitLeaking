import * as types from '../../constants/actionTypes';
import data from '../../data/data.json';

export function setDailySessions(sessions) {
    return {
        type: types.SET_DAILY_SESSIONS,
        dailySessions: sessions,
    };
}

export const getThisWeeksSqueezes = () => (dispatch) => {
    dispatch({ type: types.SQUEEZES_FETCH_SUCCESS, payload: data });
};
