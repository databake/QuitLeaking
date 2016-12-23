import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';

import { SQUEEZE_COMPLETE, SQUEEZE_NOT_COMPLETE } from '../app/constants/constants';

class LargeRadioButton extends Component {

    constructor(props) {
        super(props);
        this.onButtPress = this.onButtPress.bind(this);
    }

    onButtPress() {
        this.props.onButtonPress(
            this.props.sessionIndex, 
            this.props.squeezeIndex, 
            this.toggleComplete()
        );
    }

    toggleComplete() {
        if (this.props.complete === SQUEEZE_COMPLETE) {
            return SQUEEZE_NOT_COMPLETE;
        }
        return SQUEEZE_COMPLETE;
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={this.onButtPress} 
            >
                <View 
                    style={
                        this.props.complete ? 
                        [styles.complete, { backgroundColor: this.props.color }] : 
                        [styles.inComplete, { borderColor: this.props.color }]
                    } 
                />
            </TouchableOpacity>
        );
    }
}

LargeRadioButton.propTypes = {
    color: PropTypes.string.isRequired,
    sessionIndex: PropTypes.number.isRequired,
    squeezeIndex: PropTypes.number.isRequired,
    complete: PropTypes.number,
};

LargeRadioButton.defaultProps = {
    complete: 0,
};

const styles = StyleSheet.create({
    complete: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    inComplete: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2 / PixelRatio.get(),
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
    },
});

export default LargeRadioButton;
