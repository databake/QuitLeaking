import moment from 'moment';
import squeezeReducer from '../app/modules/squeezes/squeeze.reducer';
import leakReducer from '../app/modules/leakage/leakage.reducer';

describe('default state', () => {
    it('should produce an array of days', () => {
        // given

        // when
        const result = squeezeReducer(undefined, 'TEST_ACTION');
        // then 
        expect(result.squeezeDays).toHaveLength(7);
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
        const result = squeezeReducer(undefined, 'TEST_ACTION');
        // then 
        expect(result.squeezeDays).toContainEqual(dayObject);
    });

    it('should have some leakage data', () => {
        // given
        
        const leakage = leakReducer(undefined, 'TEST_ACTION');

        // then
        expect(leakage).toBeDefined();
    });

    it('should have a selected index of today weekday()', () => {
        // given
        const { leakageSelectedIndex } = leakReducer(undefined, 'TEST_ACTION');
        // when
        const resultIndex = moment().startOf('day').unix();
        // then 
        expect(leakageSelectedIndex).toEqual(resultIndex);
    });

    it('should create 7 days in the week array', () => {
        // given
        const { leakageWeek } = leakReducer(undefined, 'TEST_ACTION');
        // when
        const expectedResult = 7;
        // then
        expect(leakageWeek).toHaveLength(expectedResult);
    });
});
