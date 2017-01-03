import moment from 'moment';
import leakageReducer from '../app/modules/leakage/leakage.reducer';
import * as Types from '../app/constants/actionTypes';

describe('Leakage reducer', () => {
    let weekDay;

    beforeEach(() => {
        weekDay = moment().startOf('day').unix();
    });

    afterEach(() => {
        weekDay = undefined;
    });

    it('should set the in volume', () => {
        const action = { type: Types.SET_IN_VOLUME, volume: 1000, id: weekDay };
        const newState = leakageReducer(undefined, action);
        const day = newState.leakageWeek.filter((e) => e.id === weekDay)[0];
        expect(day.inVolume).toEqual(1000);
    });

    it('should not set the percentage when the in volume is updated', () => {
        const action = { type: Types.SET_OUT_VOLUME, volume: 1000, id: weekDay };
        const newState = leakageReducer(undefined, action);        
        const day = newState.leakageWeek.filter((e) => e.id === weekDay)[0];
        expect(day.outVolume).toEqual(1000);
    });

    it('should not set the percentage when the out volume is updated', () => {
        const action = { type: Types.SET_OUT_VOLUME, volume: 1000, id: weekDay };
        const newState = leakageReducer(undefined, action);        
        const day = newState.leakageWeek.filter((e) => e.id === weekDay)[0];
        expect(day.percentage).toEqual(0);
    });

    it('should update the percentage when the out an in volume are updated', () => {
        const inAction = { type: Types.SET_IN_VOLUME, volume: 1000, id: weekDay };
        const outAction = { type: Types.SET_OUT_VOLUME, volume: 500, id: weekDay };
        const newState = leakageReducer(undefined, inAction);
        const endState = leakageReducer(newState, outAction);        
        const day = endState.leakageWeek.filter((e) => e.id === weekDay)[0];
        expect(day.percentage).toEqual(0.5);
    });
});
