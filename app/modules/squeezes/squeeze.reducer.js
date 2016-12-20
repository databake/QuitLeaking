import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

const updateShortSqueeze = (state, action) => state.map((squeeze) => {
    if (action.id !== squeeze.id) {
        return squeeze;
    }
    return {
        ...squeeze,
        shortDone: action.shortDone,
        percentage: calcPercentage(action.shortDone, squeeze.shortGoal)
    };
});

const updateLongSqueeze = (state, action) => state.map((squeeze) => {
    if (action.id !== squeeze.id) {
        return squeeze;
    }
    return {
        ...squeeze,
        longDone: action.longDone,
        percentage: calcPercentage(action.longDone, squeeze.longGoal)
    };
});

const calcPercentage = (longDone, longGoal) => {
    const sum = longDone.reduce((previous, number) => (previous + number), 0);
    return (longGoal === 0) ? 0 : (sum / longGoal);
};

export default function (state = initialState.squeezes, action) {
    switch (action.type) {
        case types.SET_DAILY_SESSIONS: {
            const configCopy = { ...state.config, dailySessions: action.dailySessions };
            return { ...state, config: configCopy };
        }
        case types.SET_LONG_RESULTS: {
            const sq = updateLongSqueeze(state.squeezeDays, action);
            return { ...state, squeezeDays: sq };
        }
        case types.SET_SHORT_RESULTS: {
            const sq = updateShortSqueeze(state.squeezeDays, action);
            return { ...state, squeezeDays: sq };
        }
        default:
            return state;
    }
}
