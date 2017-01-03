import moment from 'moment';
import * as types from '../../constants/actionTypes';

const today = moment().startOf('day');

const initialState = {
    days: [],
    currentWeek: [
        { id: moment(today).subtract(7, 'day').unix(), squeezePerc: 0, leakagePerc: 0 },
        { id: moment(today).subtract(6, 'day').unix(), squeezePerc: 0, leakagePerc: 0 },
        { id: moment(today).subtract(5, 'day').unix(), squeezePerc: 0, leakagePerc: 0 },
        { id: moment(today).subtract(4, 'day').unix(), squeezePerc: 0, leakagePerc: 0 },
        { id: moment(today).subtract(3, 'day').unix(), squeezePerc: 0, leakagePerc: 0 },
        { id: moment(today).subtract(2, 'day').unix(), squeezePerc: 0, leakagePerc: 0 },
        { id: moment(today).subtract(1, 'day').unix(), squeezePerc: 0, leakagePerc: 0 },
        { id: moment(today).unix(), squeezePerc: 0, leakagePerc: 0 },
    ]
};

function insertItem(array, item) {
    const newArray = array ? [...array] : [];
    newArray.push(item);
    return newArray;
}

function updateObjectInArray(array, id, key, value) {
    return array.map((item) => {
        if (item.id !== id) {
            return item;
        }
        return { ...item, [key]: value };    
    });
}

function replaceObjectInArray(array, object) {
    return array.map((item) => {
        if (item.id !== object.id) {
            return item;
        }
        return object;
    });
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_LAST_WEEKS_INSIGHT: {
            return state.currentWeek;
        }
        case types.LEAK_PERCENT_UPDATED: {
            const { days } = state;
            let newDays;
            if (!days || days.filter(x => x.id === action.id).length === 0) {
                const newDay = { id: action.id, squeezePerc: 0, leakagePerc: action.percentage };
                newDays = insertItem(days, newDay);
            } else {
                newDays = updateObjectInArray(days, action.id, 'leakagePerc', action.percentage);
            }
            const updatedDay = newDays.filter(x => x.id === action.id);
            const newCurrentWeek = replaceObjectInArray(state.currentWeek, updatedDay[0]);
            return { ...state, days: newDays, currentWeek: newCurrentWeek };
        }
        case types.SQUEEZE_PERCENT_UPDATED: {
            const { days } = state;
            let newDays;
            if (!days || days.filter(x => x.id === action.id).length === 0) {
                const newDay = { id: action.id, squeezePerc: action.percentage, leakagePerc: 0 };
                newDays = insertItem(days, newDay);
            } else {
                newDays = updateObjectInArray(days, action.id, 'squeezePerc', action.percentage);
            }
            const updatedDay = newDays.filter(x => x.id === action.id);
            const newCurrentWeek = replaceObjectInArray(state.currentWeek, updatedDay[0]);
            return { ...state, days: newDays, currentWeek: newCurrentWeek };
        }
        default: {
            return state;
        }
    }
}
