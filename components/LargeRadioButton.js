import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  PixelRatio,
} from 'react-native';

// TODO: Add a button and update state with true/false for the selected.
class LargeRadioButton extends Component {

    render() {
        return (
            <View 
                style={
                    this.props.complete ? 
                    [styles.complete, { backgroundColor: this.props.color }] : 
                    [styles.inComplete, { borderColor: this.props.color }]
                } 
            />
        );
    }
}

LargeRadioButton.propTypes = {
    color: PropTypes.string.isRequired,
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
