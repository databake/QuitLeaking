import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import * as Progress from 'react-native-progress';

class SmallCircleProgress extends Component {

    constructor(props) {
        super(props);
        this.onButtPress = this.onButtPress.bind(this);
    }

    onButtPress() {
        const { highLighted, dayIndex } = this.props;
        if (!highLighted) {
            console.log(`New selectedIndex: ${dayIndex}`);
            // TODO: execute props onPress
            this.props.onButtonPress(dayIndex);
        }
    }

    render() {
        let dayStyle;
        if (this.props.highLighted) {
            dayStyle = [styles.highLighted, { backgroundColor: this.props.color }]; 
        } else {
            dayStyle = styles.text; 
        }

        return (
            <TouchableOpacity onPress={this.onButtPress}>
                <View style={styles.container}>
                    <Text style={dayStyle}>{this.props.day}</Text>
                    <Progress.Circle
                        borderColor='white'
                        size={32}
                        unfilledColor='#ECF0F1'
                        progress={this.props.progress}
                        style={styles.progress}
                        thickness={5}
                        color={this.props.color}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

SmallCircleProgress.propTypes = {
    progress: PropTypes.number.isRequired,
    dayIndex: PropTypes.number.isRequired,
    highLighted: PropTypes.bool.isRequired,
};

SmallCircleProgress.defaultProps = {
    color: 'red',
    borderColor: '#FFA07A',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    progress: {
        margin: 10,
    },
    text: {
        color: 'black',
        fontSize: 10,
    },
    highLighted: {
        color: 'white',
        fontSize: 10,
        backgroundColor: 'red',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 4,
        fontWeight: 'bold',
    }
});

export default SmallCircleProgress;
