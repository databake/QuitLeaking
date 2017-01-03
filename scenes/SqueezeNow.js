import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Button,
} from 'react-native';

import { NavigationStyles } from '@exponent/ex-navigation';
import moment from 'moment';
import padNumber from '../components/padNumber';
import range from '../components/range';
import DataStore from '../components/DataStore';
import todayAtMidnight from '../components/todayAtMidnight';
import Colors from '../constants/Colors';

const DEFAULT_WORK_DURATION = 10;
const DEFAULT_BREAK_DURATION = 10;
const ONE_SECOND = 1;
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

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: new Animated.Value(0),
            countdownState: 'idle',
            lastTick: null,
            endTime: null,
        };
    }

    async componentDidMount() {
        this.fetchCompletedCount();
    }

    async squeezeDidComplete() {
        await DataStore.incrementHarvest(todayAtMidnight());
        this.fetchCompletedCount();
    }

    async fetchCompletedCount() {
        const completedToday = await DataStore.harvestCountForDate(todayAtMidnight());
        this.setState({ completedToday });
    }

    pauseTimer() {
        this.setState({ countdownState: 'paused' }, () => {
            Animated.spring(this.state.backgroundColor, { toValue: 0.5 }).start();
            clearInterval(this.timer);
            this.timer = null;
        });
    }

    stopTimer() {
        this.setState({ countdownState: 'idle', lastTick: null, endTime: null }, () => {
            Animated.spring(this.state.backgroundColor, { toValue: 0 }).start();
            clearInterval(this.timer);
            this.timer = null;
        });
    }

    startTimer() {
        const { workDuration } = this.props;
        clearInterval(this.timer);

        const currentTime = moment();
        let endTime;

        if (this.state.countdownState === 'paused' && this.state.lastTick && this.state.endTime) {
            const timeIdle = currentTime - this.state.lastTick;
            endTime = this.state.endTime + timeIdle;
        } else {
            endTime = moment(currentTime).add(workDuration, 's');
        }
        console.log('endtime else:', endTime);
        this.setState({ countdownState: 'active', endTime, lastTick: currentTime }, async () => {
            Animated.spring(this.state.backgroundColor, { toValue: 1 }).start();

            // Start ticker
            this.timer = setInterval(() => {
                const lastTick = moment();
                if (lastTick > endTime) {
                    this.squeezeDidComplete();
                    this.startBreak();
                } else {
                    this.setState({ lastTick });
                }
            }, ONE_SECOND);
        });
    }

    startBreak() {
        const { breakDuration } = this.props;
        clearInterval(this.timer);

        const currentTime = moment();
        const endTime = moment(currentTime).add(breakDuration, 's');

        this.setState({ countdownState: 'break', endTime, lastTick: currentTime }, async () => {
            Animated.spring(this.state.backgroundColor, { toValue: 2 }).start();

            // Start ticker
            this.timer = setInterval(() => {
                const lastTick = moment();
                if (lastTick > endTime) {
                    this.startTimer();
                } else {
                    this.setState({ lastTick });
                }
            }, ONE_SECOND);
        });
    }


    renderTodaysCount() {
        const { completedToday } = this.state;
        return range(completedToday).map((_, i) => <Text key={i}>{SQUEEZE}</Text>);
    }

    renderTimeRemaining() {
        const { endTime, lastTick } = this.state;
        let minutesRemaining;
        let secondsRemaining;

        if (endTime && lastTick) {
            minutesRemaining = Math.floor(((endTime - lastTick) / 1000) / 60);
            secondsRemaining = Math.round(((endTime - lastTick) / 1000) - (minutesRemaining * 60));
        } else if (this.state.countdownState === 'idle' && !endTime && !lastTick) {
            minutesRemaining = 0;
            secondsRemaining = Math.round(this.props.workDuration);
        } else {
            console.log({ error: true, endTime, lastTick });
        }

        return (
            <Text style={styles.countdown}>
                {`${padNumber(secondsRemaining, 2)}`}
            </Text>
        );
    }

    renderButtons() {
        const { countdownState } = this.state;

        if (countdownState === 'idle') {
            return (
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={() => { this.startTimer(); }} 
                        title="Start" 
                        color={Colors.tintColor} 
                    />
                </View>
            );
        } else if (countdownState === 'active') {
            return (
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={() => { this.pauseTimer(); }} 
                        title="Pause" 
                        color={Colors.tintColor} 
                    />
                    <Button 
                        onPress={() => { this.stopTimer(true); }} 
                        title="Stop" 
                        color={Colors.tintColor}
                    />
                </View>
            );
        } else if (countdownState === 'paused') {
            return (
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={() => { this.startTimer(); }} 
                        title="Start" 
                        color={Colors.tintColor} 
                    />
                    <Button 
                        onPress={() => { this.stopTimer(true); }} 
                        title="Stop" 
                        color={Colors.tintColor} 
                    />
                </View>
            );
        } else if (countdownState === 'break') {
            return (
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={() => { this.startTimer(); }} 
                        title="Skip break" 
                        color={Colors.tintColor} 
                    />
                </View>
            );
        }
    }

    render() {
        // const { currentScreen } = this.state;
        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['#999999', '#669999', '#003333'],
        });

        return (
            <Animated.View style={[styles.container, { backgroundColor }]}>
                <View style={styles.contentContainer}>
                    {this.renderTimeRemaining()}
                </View>
                {this.renderButtons()}
                <View style={styles.completedContainer}>
                    <Text style={styles.completedText}>
                        {this.renderTodaysCount()}
                    </Text>
                </View>
            </Animated.View>
        );
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
        fontSize: 90,
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
});

export default SqueezeNow;
