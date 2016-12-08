import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    Image,
    Alert,
    Button,
} from 'react-native';

import { NavigationStyles } from '@exponent/ex-navigation';
import padNumber from '../components/padNumber';
import range from '../components/range';
import DataStore from '../components/DataStore';
import todayAtMidnight from '../components/todayAtMidnight';
import Colors from '../constants/Colors';

const DEFAULT_WORK_DURATION = 0.16667;
const DEFAULT_BREAK_DURATION = 0.16667;
const ONE_SECOND = 1000;
const SQUEEZE = '❤️';

class SqueezeNow extends Component {

    static defaultProps = {
        workDuration: DEFAULT_WORK_DURATION,
        breakDuration: DEFAULT_BREAK_DURATION,
    }

    static route = {
        navigationBar: {
            visible: true,
            title: 'Squeeze-O-meter',
        },
        styles: {
            ...NavigationStyles.SlideVertical
        }
    }

    state = {
        backgroundColor: new Animated.Value(0),
        countdownState: 'idle',
        lastTick: null,
        endTime: null,
    };

    componentDidMount() {
        this._fetchCompletedCount();
    }

    render() {
        let { currentScreen } = this.state;
        let backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['#999999', '#669999', '#003333'],
        });

        return (
            <Animated.View style={[styles.container, { backgroundColor }]}>
                <View style={styles.contentContainer}>
                    {this._renderTimeRemaining()}
                </View>
                {this._renderButtons()}
                <View style={styles.completedContainer}>
                    <Text style={styles.completedText}>
                        {this._renderTodaysCount()}
                    </Text>
                </View>
            </Animated.View>
        )
    }

    async _squeezeDidComplete() {
        await DataStore.incrementHarvest(todayAtMidnight());
        this._fetchCompletedCount();
    }

    async _fetchCompletedCount() {
        let completedToday = await DataStore.harvestCountForDate(todayAtMidnight());
        this.setState({ completedToday });
    }

    _renderTodaysCount() {
        let { completedToday } = this.state;
        return range(completedToday).map((_, i) => <Text key={i}>{SQUEEZE}</Text>);
    }

    _renderTimeRemaining() {
        let { endTime, lastTick } = this.state;
        let minutesRemaining;
        let secondsRemaining;

        if (endTime && lastTick) {
            minutesRemaining = Math.floor(((endTime - lastTick) / 1000) / 60);
            secondsRemaining = Math.round(((endTime - lastTick) / 1000) - (minutesRemaining * 60));
        } else if (this.state.countdownState === 'idle' && !endTime && !lastTick) {
            minutesRemaining = Math.floor(this.props.workDuration);
            secondsRemaining = Math.round((this.props.workDuration - minutesRemaining) * 60);
        } else {
            console.log({ error: true, endTime, lastTick });
        }

        return (
            <Text style={styles.countdown}>
                {`${padNumber(minutesRemaining, 2)}:${padNumber(secondsRemaining, 2)}`}
            </Text>
        );
    }

    _renderButtons() {
        let { countdownState } = this.state;

        if (countdownState === 'idle') {
            return (
                <View style={styles.buttonContainer}>
                    <Button onPress={() => { this._startTimer() }} title="Start" color={Colors.tintColor} />
                </View>
            );
        } else if (countdownState === 'active') {
            return (
                <View style={styles.buttonContainer}>
                    <Button onPress={() => { this._pauseTimer() } } title="Pause" color={Colors.tintColor} />
                    <Button onPress={() => { this._stopTimer(true) } } title="Stop" color={Colors.tintColor} />
                </View>
            );
        } else if (countdownState === 'paused') {
            return (
                <View style={styles.buttonContainer}>
                    <Button onPress={() => { this._startTimer() } } title="Start" color={Colors.tintColor} />
                    <Button onPress={() => { this._stopTimer(true) } } title="Stop" color={Colors.tintColor} />
                </View>
            );
        } else if (countdownState === 'break') {
            return (
                <View style={styles.buttonContainer}>
                    <Button onPress={() => { this._startTimer() } } title="Skip break" color={Colors.tintColor} />
                </View>
            );
        }
    }

    _pauseTimer() {
        this.setState({ countdownState: 'paused' }, () => {
            Animated.spring(this.state.backgroundColor, { toValue: 0.5 }).start();

            clearInterval(this._timer);
            this._timer = null;
        });
    }

    _stopTimer(cancelNotification = false) {
        let { workDuration } = this.props;

        this.setState({ countdownState: 'idle', lastTick: null, endTime: null }, () => {
            Animated.spring(this.state.backgroundColor, { toValue: 0 }).start();
            clearInterval(this._timer);
            this._timer = null;
        });
    }

    _startTimer() {
        let { workDuration } = this.props;
        clearInterval(this._timer);

        let currentTime = (new Date()).getTime();
        let endTime;

        if (this.state.countdownState === 'paused' && this.state.lastTick && this.state.endTime) {
            let timeIdle = currentTime - this.state.lastTick;
            endTime = this.state.endTime + timeIdle;
        } else {
            endTime = currentTime + workDuration * 60 * 1000;
        }

        this.setState({ countdownState: 'active', endTime, lastTick: currentTime }, async () => {
            Animated.spring(this.state.backgroundColor, { toValue: 1 }).start();

            // Start ticker
            this._timer = setInterval(() => {
                let lastTick = (new Date()).getTime();
                if (lastTick > endTime) {
                    this._squeezeDidComplete();
                    this._startBreak();
                } else {
                    this.setState({ lastTick });
                }
            }, ONE_SECOND);
        });
    }

    _startBreak() {
        let { breakDuration } = this.props;
        clearInterval(this._timer);


        let currentTime = (new Date()).getTime();
        let endTime = currentTime + breakDuration * 60 * 1000;

        this.setState({ countdownState: 'break', endTime, lastTick: currentTime }, async () => {
            Animated.spring(this.state.backgroundColor, { toValue: 2 }).start();

            // Start ticker
            this._timer = setInterval(() => {
                let lastTick = (new Date()).getTime();
                if (lastTick > endTime) {
                    this._startTimer();
                } else {
                    this.setState({ lastTick });
                }
            }, ONE_SECOND);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    countdown: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 70,
    },
    buttonContainer: {
        paddingTop: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 0.5,
    },
    completedContainer: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    completedText: {
        fontSize: 30,
    },
})

export default SqueezeNow