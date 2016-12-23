
import squeezeReducer from '../app/modules/squeezes/squeeze.reducer';
import * as Types from '../app/constants/actionTypes';
import initialState from '../app/reducers/initialState';

const { squeezeDays } = initialState.squeezes;

describe('on SET_LONG_RESULTS', () => {
    it('updates the percentage done', () => {
        const action = { type: Types.SET_LONG_RESULTS, id: 1, longDone: [1, 1, 1] };
        const newState = squeezeReducer(undefined, action);
        expect(newState.squeezeDays[1].longDone).toEqual([1, 1, 1]);
    });

    it('should change the percentage to 1', () => {
        const startPercentage = squeezeDays[2].percentage;
        expect(startPercentage.toFixed(2)).toEqual('0.00');
        const action = { type: Types.SET_LONG_RESULTS, id: 2, longDone: [1, 0, 0] };
        const newState = squeezeReducer(undefined, action);
        const newPercentage = newState.squeezeDays[2].percentage;
        expect(newPercentage.toFixed(2)).toEqual('0.17');
    });

    it('should change the prcentage to 0', () => {
        const startPercentage = squeezeDays[6].percentage;
        expect(startPercentage.toFixed(2)).toEqual('0.00');
        const action = { type: Types.SET_LONG_RESULTS, id: 6, longDone: [0, 0, 0] };
        const newState = squeezeReducer(undefined, action);
        const newPercentage = newState.squeezeDays[6].percentage;
        expect(newPercentage.toFixed(2)).toEqual('0.00');        
    });
});
