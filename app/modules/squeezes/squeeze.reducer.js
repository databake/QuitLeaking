import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.squeezes, action) {
    switch (action.type) {
        case types.SET_LONG_INTERVAL:
            return {
                ...state,
                longInterval: action.longInterval
            };
        case types.SET_LONG_REPETITIONS:
            return {
                ...state,
                longRepetitions: action.longRepetitions
            };
        case types.SET_SHORT_REPETITIONS:
            return {
                ...state,
                shortRepetitions: action.shortRepetitions
            };
        case types.SET_DAILY_SESSIONS:
            return {
                ...state,
                dailySessions: action.dailySessions
            };

        default:
			return state;
    }
}

