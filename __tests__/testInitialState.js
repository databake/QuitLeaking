import moment from 'moment';
// import * as SUT from '../app/reducers/initialState';
import initialState from '../app/reducers/initialState';

describe('default state', () => {
    it('should produce an array of days', () => {
        // given

        // when
        const result = initialState.squeezes.squeezeDays;
        // then 
        expect(result).toHaveLength(7);
    });

    it('should contain a day record for today', () => {
        // given
        const dayObject = {
            id: moment().weekday(),
            date: moment().startOf('day'),
            longGoal: 3,
            shortGoal: 3,
            longDone: [0, 0, 0],
            shortDone: [0, 0, 0],
            percentage: 0
        };
        // when
        const result = initialState.squeezes.squeezeDays;
        // then 
        expect(result).toContainEqual(dayObject);
    });

    it('should have some leakage data', () => {
        // given
        
        const { leakage } = initialState;

        // then
        expect(leakage).toBeDefined();
    });

    it('should have a selected index of today weekday()', () => {
        // given
        const { leakageSelectedIndex } = initialState.leakage;
        // when
        const resultIndex = moment().weekday();
        // then 
        expect(leakageSelectedIndex).toEqual(resultIndex);
    });

    it('should create 7 days in the week array', () => {
        // given
        const { leakageWeek } = initialState.leakage;
        // when
        const expectedResult = 7;
        // then
        expect(leakageWeek).toHaveLength(expectedResult);
    });
});
