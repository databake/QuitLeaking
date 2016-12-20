
import squeezes from '../app/modules/squeezes/squeeze.reducer';
import * as Types from '../app/constants/actionTypes';

const defaultState = {
  squeezeDays: [
    { id: 0, longDone: [0, 0, 0], longGoal: 3, percentage: 0 },
    { id: 1, longDone: [0, 0, 0], longGoal: 3, percentage: 0 },
    { id: 2, longDone: [0, 0, 0], longGoal: 3, percentage: 0 },
    { id: 3, longDone: [0, 0, 0], longGoal: 3, percentage: 0 },
    { id: 4, longDone: [0, 0, 0], longGoal: 3, percentage: 0 },
    { id: 5, longDone: [0, 0, 0], longGoal: 3, percentage: 0 },
    { id: 6, longDone: [1, 1, 1], longGoal: 3, percentage: 1 },
  ]
};

describe('on SET_LONG_RESULTS', () => {
    it('updates the percentage done', () => {
        const action = { type: Types.SET_LONG_RESULTS, id: 1, longDone: [1, 1, 1] };
        const newState = squeezes(defaultState, action);
        expect(newState.squeezeDays[1].longDone).toEqual([1, 1, 1]);
    });

    it('should change the percentage to 1', () => {
        const startPercentage = defaultState.squeezeDays[2].percentage;
        expect(startPercentage.toFixed(2)).toEqual('0.00');
        const action = { type: Types.SET_LONG_RESULTS, id: 2, longDone: [1, 0, 0] };
        const newState = squeezes(defaultState, action);
        const newPercentage = newState.squeezeDays[2].percentage;
        expect(newPercentage.toFixed(2)).toEqual('0.33');
    });

    it('should change the prcentage to 0', () => {
        const startPercentage = defaultState.squeezeDays[6].percentage;
        expect(startPercentage.toFixed(2)).toEqual('1.00');
        const action = { type: Types.SET_LONG_RESULTS, id: 6, longDone: [0, 0, 0] };
        const newState = squeezes(defaultState, action);
        const newPercentage = newState.squeezeDays[6].percentage;
        expect(newPercentage.toFixed(2)).toEqual('0.00');        
    });
});
