import { combineReducers } from 'redux';
import squeezes from '../modules/squeezes/squeeze.reducer';
import leakage from '../modules/leakage/leakage.reducer';
import insight from '../modules/insight/insight.reducer';

const rootReducer = combineReducers({
    squeezes,
    leakage,
    insight,
});

export default rootReducer;
