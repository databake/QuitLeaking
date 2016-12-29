import moment from 'moment';
import insightReducer from '../app/modules/insight/insight.reducer';

describe('Insight reducer', () => {
    let action;

    beforeEach(() => {
        action = { type: 'GET_LAST_WEEKS_INSIGHT' };
    });

    afterEach(() => {
        action = undefined;
    });

    it('should return an array', () => {
        // given
        // when
        const newState = insightReducer(undefined, action);
        // then
        expect(newState.insightWeek).toHaveLength(7);
    });

    it('should have a starting element of today - a week', () => {
        // given
        const sixDaysAgo = moment().subtract(6, 'days').startOf('day');
        // when
        const newState = insightReducer(undefined, action);
        const firstElement = newState.insightWeek[0];
        // then
        expect(firstElement.date).toEqual(sixDaysAgo);
    });

    it('should return some squeeze percentages', () => {
        // when
        const newState = insightReducer(undefined, action);
        const firstElement = newState.insightWeek[0];
        // then
        expect(firstElement.result.squeeze).toEqual(0);
    }); 

        it('should return some leak percentages', () => {
        // when
        const newState = insightReducer(undefined, action);
        const firstElement = newState.insightWeek[0];
        // then
        expect(firstElement.result.leak).toEqual(0);
    }); 
});
