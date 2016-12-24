import { combineReducers } from 'redux';
import squeezes from '../modules/squeezes/squeeze.reducer';
import leakage from '../modules/leakage/leakage.reducer';

const rootReducer = combineReducers({
    squeezes,
    leakage
});

export default rootReducer;
