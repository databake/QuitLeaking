/*
    State shape
    Config {
        longInterval: 10,
        longReps: 10,
        shortReps: 10,
        sessions: 10
    },
    CurrentSqueezeWeek {
        selectedDayIndex: Date()getDay(),
        weekDayStrings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        squeezeDays: [1, 2, 3, 4, 5]
    },
    SqueezeDays: {
        byId: {
            1: {
                id: 1,
                date: 'some date',
                longGoal: 10,
                longDone: 10,
                shortGoal: 10,
                shortDone: 10,
                weekDayIndex: 1,
                squeezeSessions: [1, 2, 3]
            },
            2: {
                id: 2,
                date: 'some date',
                longGoal: 10,
                longDone: 10,
                shortGoal: 10,
                shortDone: 10,
                weekDayIndex: 1,
                squeezeSessions: [3, 4, 5]
            },
            3: ...
        },
        allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, ...]
    },
    SqueezeSessions {
        byId: {
            1: {
                id: 1,
                date: (dateTime),
                longDone: 10,
                shortDone: 10
            },
            2 : {
                id: 2,
                date: (dateTime),
                longDone: 10,
                shortDone: 10
            },
            3: ...
        },
        allIds: [1, 2, 3, ...],
    }

*/

import { PropTypes } from 'react';
import { Model, many } from 'redux-orm';

import propTypesMixin from 'redux-orm-proptypes';

const ValidatingModel = propTypesMixin(Model);

const CREATE_CONFIG = 'CREATE_CONFIG';
const UPDATE_CONFIG = 'UPDATE_CONFIG';

export class Config extends ValidatingModel {
    static reducer(state, action) {
        const { payload, type } = action;
        switch (type) {
            case CREATE_CONFIG: {
                const props = Object.assign({}, payload);
                Config.create(props);
                break;
            }
            case UPDATE_CONFIG: {
                Config.withId(action.payload.id).update(action.payload);
                break;
            }
            default:
                return Config.getNextState();
        } 
        return Config.getNextState();
    }
}

Config.modelName = 'Config';

Config.propTypes = {
    longInterval: PropTypes.number.isRequired,
    longRepetitions: PropTypes.number.isRequired,
    shortRepetitions: PropTypes.number.isRequired,
    dailySessions: PropTypes.number.isRequired,
};

Config.defaultProps = {
    longInterval: 10,
    longRepetitions: 10,
    shortRepetitions: 10,    
    dailySessions: 3,
};

const ADD_SQUEEZE_DAY = 'ADD_SQUEEZE_DAY';
const UPDATE_SQUEEZE_DAY = 'UPDATE_SQUEEZE_DAY';

export class SqueezeDay extends ValidatingModel {
    static reducer(state, action) {
        const { payload, type } = action;
        switch (type) {
            case ADD_SQUEEZE_DAY: {
                const props = Object.assign({}, payload);
                SqueezeDay.create(props);
                break;
            }
            case UPDATE_SQUEEZE_DAY: {
                SqueezeDay.withId(payload.id).update(payload);
                break;
            }
            default:
                return SqueezeDay.getNextState();
        }
        return SqueezeDay.getNextState();
    }
}
SqueezeDay.modelName = 'SqueezeDay';

SqueezeDay.propTypes = {
    date: PropTypes.date.isRequired,
    longGoal: PropTypes.number.isRequired,
    longDone: PropTypes.number.isRequired,
    shortGoal: PropTypes.number.isRequired,
    shortDone: PropTypes.number.isRequired,
    weekDayIndex: PropTypes.number.isRequired
};

const CREATE_CURRENT_WEEK = 'CREATE_CURRENT_WEEK';
const UPDATE_CURRENT_WEEK = 'UPDATE_CURRENT_WEEK';
const SET_SELECTED_DAY_INDEX = 'SET_SELECTED_DAY_INDEX';

export class CurrentWeek extends ValidatingModel {
    static reducer(state, action) {
        const { payload, type } = action;
        switch (type) {
            case CREATE_CURRENT_WEEK: {
                // get the date from the action
                // work out the first day of that week
                // get all SqueezeDays for that week
                const props = Object.assign({}, payload);
                CurrentWeek.create(props);
                break;
            }
            case UPDATE_CURRENT_WEEK: {
                CurrentWeek.withId(payload.id).update(payload);
                break;
            }
            case SET_SELECTED_DAY_INDEX: {
                CurrentWeek.withId(payload.id).update(
                    { selectedWeekDayIndex: payload.selectedWeekDayIndex }
                );
                break;
            }
            default:
                return CurrentWeek.getNextState();
        }
        return CurrentWeek.getNextState();
    }
}
CurrentWeek.modelName = 'CurrentWeek';
CurrentWeek.fields = {
    squeezeDays: many('SqueezeDay', 'squeezeDays'),
};

CurrentWeek.propTypes = {
    weekDayStrings: PropTypes.array.isRequired,
    selectedWeekDayIndex: PropTypes.number.isRequired,
    squeezeDays: PropTypes.arrayOf([
        PropTypes.instanceOf('SqueezeDay'),
        PropTypes.number
    ]).isRequired,
};

CurrentWeek.defaultProps = {
    weekDayStrings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    selectedWeekDayIndex: new Date().getDay(),
};
