import leakageReducer from '../app/modules/leakage/leakage.reducer';
import * as Types from '../app/constants/actionTypes';
// import initialState from '../app/reducers/initialState';

describe('Leakage reducer', () => {
    it('should set the in volume', () => {
        // Given
        const weekDay = 0;
        const action = { type: Types.SET_IN_VOLUME, volume: 1000, id: weekDay };
        // When
        const newState = leakageReducer(undefined, action);
        // Then
        expect(newState.leakageWeek[weekDay].inVolume).toEqual(1000);
    });

    it('should not set the percentage when the in volume is updated', () => {
        // Given
        const weekDay = 1;
        const action = { type: Types.SET_OUT_VOLUME, volume: 1000, id: weekDay };
        // When
        const newState = leakageReducer(undefined, action);        
        // Then
        expect(newState.leakageWeek[weekDay].outVolume).toEqual(1000);
    });

    it('should not set the percentage when the out volume is updated', () => {
        // Given
        const weekDay = 2;
        const action = { type: Types.SET_OUT_VOLUME, volume: 1000, id: weekDay };
        // When
        const newState = leakageReducer(undefined, action);        
        // Then
        const newPercentage = newState.leakageWeek[weekDay].percentage;
        expect(newPercentage).toEqual(0);
    });

    it('should update the percentage when the out an in volume are updated', () => {
        // Given
        const weekDay = 3;
        const inAction = { type: Types.SET_IN_VOLUME, volume: 1000, id: weekDay };
        const outAction = { type: Types.SET_OUT_VOLUME, volume: 500, id: weekDay };
        // When
        const newState = leakageReducer(undefined, inAction);
        const endState = leakageReducer(newState, outAction);        
        // Then
        const newPercentage = endState.leakageWeek[weekDay].percentage;
        expect(newPercentage).toEqual(0.5);
    });
});
