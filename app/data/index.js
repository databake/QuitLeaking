
import moment from 'moment';

const today = moment();

const days = [
    { date: '2016-12-01', done: 6, goal: 6 },
    { date: '2016-12-02', done: 6, goal: 6 },
    { date: '2016-12-03', done: 6, goal: 6 },
    { date: '2016-12-04', done: 6, goal: 6 },
    { date: '2016-12-05', done: 6, goal: 6 },
    { date: '2016-12-06', done: 6, goal: 6 },
    { date: '2016-12-07', done: 6, goal: 6 },
    { date: '2016-12-08', done: 6, goal: 6 },
    { date: '2016-12-09', done: 6, goal: 6 },
    { date: '2016-12-10', done: 6, goal: 6 },
    { date: '2016-12-11', done: 6, goal: 6 },
];

export const getObjectsBetweenDates = (objects, start, end) => objects.filter((object) => 
    today(object.date).isBetween(start, end, null, '[]')); 

export const getObjectsInWeekNumber = (objects, weekNumber, yearNumber) => 
    objects.filter((object) =>
    today(object.date).year() === yearNumber && 
    today(object.date).week() === weekNumber
);

export const getObjectsWithSameWeekNumber = (objects, date) => objects.filter((object) => 
    today(object.date).year() === today(date).year() &&
    today(object.date).week() === today(date).week()
);

export const addFieldsToDays = (objects) => objects.map((object, i) => {
    const perc = object.done / object.goal;
    const fred = Object.assign({ key: i, percentage: perc });
    return { ...object, ...fred };
});

export const incrementDone = (object) => ({ ...object, done: object.done + 1 });


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWeekData = (weekNumber, yearNumber) =>
    delay(500).then(() => {
        // get the days that are in this weekNumber
        const objects = getObjectsWithSameWeekNumber(days, weekNumber, yearNumber);
        // order them by date
        objects.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        // work out the daily goals and results
        const retData = addFieldsToDays(objects);
        console.log(retData);
        return retData;
        // work out the daily completed
        // package them in a state object
        // return them to the app
    });
