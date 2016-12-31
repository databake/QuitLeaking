import moment from 'moment';
import insightReducer from '../app/modules/insight/insight.reducer';

describe('Initial state', () => {
    xit('should return an object for 7 days ago', () => {
        const expected = moment().subtract(7, 'days').startOf('day');
        const expectedKey = moment(expected).unix();
        const newState = insightReducer(undefined, { type: 'GET_LAST_WEEKS_INSIGHT' });
        expect(newState[expectedKey].date).toEqual(expected);
    });

    xit('should return an object for today', () => {
        const expected = moment().startOf('day');
        const expectedKey = moment(expected).unix();
        const newState = insightReducer(undefined, { type: 'GET_LAST_WEEKS_INSIGHT' });
        expect(newState[expectedKey].date).toEqual(expected);
    });

    xit('should not return an object for 8 days ago', () => {
        const expected = moment().subtract(8, 'days').startOf('day').unix();
        const expectedKey = moment(expected).unix;
        const newState = insightReducer(undefined, { type: 'GET_LAST_WEEKS_INSIGHT' });
        expect(newState[expectedKey]).toBeUndefined();
    });
});

describe('updates', () => {
    it('should create a new day', () => {
        const timeStamp = moment().subtract(1, 'day').startOf('day').unix();
        const actionIn = { 
            type: 'LEAK_PERCENT_UPDATED', 
            id: timeStamp, 
            percentage: 0.5
        };
        const newState = insightReducer(undefined, actionIn);
        expect(newState.days[0].id).toEqual(timeStamp);
    });

    it('should update if the day exists exist', () => {
        const timeStamp = moment().subtract(1, 'day').startOf('day').unix();
        const actionIn = { 
            type: 'LEAK_PERCENT_UPDATED', 
            id: timeStamp, 
            percentage: 0.5
        };
        const newState = insightReducer(undefined, actionIn);
        expect(newState.days[0].id).toEqual(timeStamp);
        const newAction = {
            type: 'LEAK_PERCENT_UPDATED', 
            id: timeStamp, 
            percentage: 0.75            
        };
        const nextState = insightReducer(newState, newAction);
        expect(nextState.days[0].leakagePerc).toEqual(0.75);
        expect(nextState.days).toHaveLength(1);

        const squeezeAction = {
            type: 'SQUEEZE_PERCENT_UPDATED',
            id: timeStamp,
            percentage: 0.66
        };
        const squeezeState = insightReducer(nextState, squeezeAction);
        expect(squeezeState.days[0].squeezePerc).toEqual(0.66);
        expect(squeezeState.days).toHaveLength(1);
    });

    it('should update the currentWeek if the date is between start and end', () => {
        const timeStamp = moment().subtract(1, 'day').startOf('day').unix();
        const actionIn = {
            type: 'LEAK_PERCENT_UPDATED',
            id: timeStamp,
            percentage: 0.5
        };
        const newState = insightReducer(undefined, actionIn);
        expect(newState.currentWeek[6].leakagePerc).toEqual(0.5);
    });
});
