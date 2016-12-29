const MEASURE_TYPE_IN = 0;
const MEASURE_TYPE_OUT = 1;

const mockState = {
    daysById: {
        day1: { 
            id: 'day1', 
            date: '2016-12-01', 
            measures: ['measure1', 'measure2'], 
            sessions: ['sess1', 'sess2', 'sess3'] 
        },
        day2: { 
            id: 'day2', 
            date: '2016-12-02', 
            measures: ['measure3', 'measure4'], 
            sessions: ['sess4', 'sess5', 'sess6'] 
        },
        day3: { 
            id: 'day3', 
            date: '2016-12-03', 
            measures: ['measure5', 'measure6'], 
            sessions: ['sess7', 'sess8', 'sess9'] 
        },
        day4: { 
            id: 'day4', 
            date: '2016-12-04', 
            measures: ['measure7', 'measure8'], 
            sessions: ['sess10', 'sess11', 'sess12'] 
        },
        day5: {
            id: 'day5',
            date: '2016-12-05',
            measures: [],
            sessions: []
        },
        day6: {
            id: 'day6',
            date: '2016-12-06',
            measures: [],
            sessions: []
        },
        day7: {
            id: 'day7',
            date: '2016-12-07',
            measures: [],
            sessions: []
        }
    },
    measuresById: {
        measure1: { id: 'measure1', type: MEASURE_TYPE_IN, volume: 2000 },
        measure2: { id: 'measure2', type: MEASURE_TYPE_OUT, volume: 1800 },
        measure3: { id: 'measure3', type: MEASURE_TYPE_IN, volume: 2000 },
        measure4: { id: 'measure4', type: MEASURE_TYPE_OUT, volume: 1700 },
        measure5: { id: 'measure5', type: MEASURE_TYPE_IN, volume: 2000 },
        measure6: { id: 'measure6', type: MEASURE_TYPE_OUT, volume: 1600 },
        measure7: { id: 'measure7', type: MEASURE_TYPE_IN, volume: 2000 },
        measure8: { id: 'measure8', type: MEASURE_TYPE_OUT, volume: 1500 },
    },
    sessionsById: {
        sess1: { id: 'sess1', long: true, short: true },
        sess2: { id: 'sess2', long: true, short: true },
        sess3: { id: 'sess3', long: true, short: true },
        sess4: { id: 'sess4', long: true, short: false },
        sess5: { id: 'sess5', long: true, short: false },
        sess6: { id: 'sess6', long: true, short: false },
        sess7: { id: 'sess7', long: false, short: false },
        sess8: { id: 'sess8', long: false, short: false },
        sess9: { id: 'sess9', long: false, short: false },
        sess10: { id: 'sess10', long: false, short: true },
        sess11: { id: 'sess11', long: false, short: true },
        sess12: { id: 'sess12', long: false, short: true },
    }
};

describe('Mock State', () => {
    it('should have 2 measurments on day 1', () => {
        expect(mockState.daysById.day1.measures).toHaveLength(2);
    });
    
    it('should have 3 sessions on day 4', () => {
        expect(mockState.daysById.day4.sessions).toHaveLength(3);
    });

    it('should have 0 sessions on day 6', () => {
        expect(mockState.daysById.day6.sessions).toHaveLength(0);
    });
});
