import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.squeezes, action) {
    switch (action.type) {
        case types.SET_DAILY_SESSIONS:
            return {
                ...state,
                dailySessions: action.dailySessions
            };
        case types.SQUEEZES_FETCH_SUCCESS:
            return {
                ...state,
                thisWeeksSqueezes: action.payload
            };
        case types.SQUEEZES_FETCH_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
			return state;
    }
}
