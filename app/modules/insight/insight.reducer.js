import moment from 'moment';
import * as types from '../../constants/actionTypes';
import leakReducer from '../leakage/leakage.reducer';
import squeezeReducer from '../squeezes/squeeze.reducer';

const leakForDate = (date) => {
    const { leakageWeek } = leakReducer(undefined, { type: types.GET_LEAKAGE_DATA });
    const foundDays = leakageWeek.filter((day) => (day.date === date));
    if (foundDays.length > 0) {
        return foundDays[0].percentage;
    }
    return 0;
};

const squeezeForDate = (date) => {
    const { squeezeDays } = squeezeReducer(undefined, { type: 'GET_SQUEEZE_DATA' });
    const foundDays = squeezeDays.filter((day) => (day.date === date));
    if (foundDays.length > 0) {
        return foundDays[0].percentage;
    }
    return 0;
};

const insightDays = () => {
    const daysArray = [];
    let index;
    for (index = 0; index < 7; index++) {
        const newDate = moment().subtract(index, 'days').startOf('day');
        daysArray.push({
            date: newDate,
            result: {
                squeeze: squeezeForDate(newDate),
                leak: leakForDate(newDate)
            }
        });
    }
    daysArray.reverse();
    return daysArray;
};

const initialState = {
    insights: {
        insightWeek: insightDays(),
    }
};

export default function (state = initialState.insights, action) {
    switch (action.type) {
        case types.GET_LAST_WEEKS_INSIGHT: {
            return state;
        }
        default: {
            return state;
        }
    }
}
