import moment from 'moment';
import * as SUT from '../app/reducers/initialState';

describe('default state', () => {
    it('should produce an array of days', () => {
        // given

        // when
        const result = SUT.dafaultSqueezeDays();
        // then 
        expect(result).toHaveLength(7);
    });

    it('should contain a day record for today', () => {
        // given
        const dayObject = {
            id: 0,
            date: moment().startOf('day'),
            longGoal: 3,
            shortGoal: 3,
            longDone: [false, false, false],
            shortDone: [false, false, false],
            percentage: 0
        };
        // when
        const result = SUT.dafaultSqueezeDays();
        // then 
        expect(result).toContainEqual(dayObject);
    });

    it('should update the long done stuff', () => {
        
    });
});
