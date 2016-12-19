
import squeezes from '../app/modules/squeezes/squeeze.reducer';
import * as Types from '../app/constants/actionTypes';

const defaultState = {
  squeezeDays: [
    { id: 0, longDone: [false, false, false], longGoal: 3, percentage: 0 },
    { id: 1, longDone: [false, false, false], longGoal: 3, percentage: 0 },
    { id: 2, longDone: [false, false, false], longGoal: 3, percentage: 0 },
    { id: 3, longDone: [false, false, false], longGoal: 3, percentage: 0 },
    { id: 4, longDone: [false, false, false], longGoal: 3, percentage: 0 },
    { id: 5, longDone: [false, false, false], longGoal: 3, percentage: 0 },
    { id: 6, longDone: [true, true, true], longGoal: 3, percentage: 1 },
  ]
};

describe('on SET_LONG_RESULTS', () => {
    it('updates the percentage done', () => {
        const action = { type: Types.SET_LONG_RESULTS, id: 1, longDone: [true, true, true] };
        const newState = squeezes(defaultState, action);
        expect(newState.squeezeDays[1].longDone).toEqual([true, true, true]);
    });

    it('should change the percentage to 1', () => {
        const startPercentage = defaultState.squeezeDays[2].percentage;
        expect(startPercentage.toFixed(2)).toEqual('0.00');
        const action = { type: Types.SET_LONG_RESULTS, id: 2, longDone: [true, false, false] };
        const newState = squeezes(defaultState, action);
        const newPercentage = newState.squeezeDays[2].percentage;
        expect(newPercentage.toFixed(2)).toEqual('0.33');
    });

    it('should change the prcentage to 0', () => {
        const startPercentage = defaultState.squeezeDays[6].percentage;
        expect(startPercentage.toFixed(2)).toEqual('1.00');
        const action = { type: Types.SET_LONG_RESULTS, id: 6, longDone: [false, false, false] };
        const newState = squeezes(defaultState, action);
        const newPercentage = newState.squeezeDays[6].percentage;
        expect(newPercentage.toFixed(2)).toEqual('0.00');        
    });
});
