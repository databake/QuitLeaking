import { combineReducers } from 'redux';
import squeezes from '../modules/squeezes/squeeze.reducer';

const rootReducer = combineReducers({
    squeezes
});

export default rootReducer;
