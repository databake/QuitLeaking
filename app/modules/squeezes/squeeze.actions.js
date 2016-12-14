import axios from 'axios';
import * as types from '../../constants/actionTypes';
// import data from '../../data/data.json';

export function setDailySessions(sessions: Number) :Object {
    return {
        type: types.SET_DAILY_SESSIONS,
        dailySessions: sessions,
    };
}

export function currentDataSuccess(res: Object) :Object {
     return {
        type: types.SQUEEZES_FETCH_SUCCESS,
        payload: res.data,
    };
}

export function currentDataFailure(error) {
    return {
        type: types.SQUEEZES_FETCH_FAILURE,
        payload: error,
    };
}

export function currentData() :Function {
    return function (dispatch) :Object {
        return axios.get('https://demo1703659.mockable.io/quitleaking')
        .then(res => {
            dispatch(currentDataSuccess(res));
        })
        .catch(error => {
            dispatch(currentDataFailure(error));
        });  
    };
}

