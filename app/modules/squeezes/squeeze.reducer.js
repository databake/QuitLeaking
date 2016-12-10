import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.squeezes, action) {
    switch (action.type) {
        case types.RETRIEVE_LONG_SQUEEZES_SUCCESS:
            return {
                ...state,
                longInterval: action.longInterval
            };
        default:
			return state;
    }
}

