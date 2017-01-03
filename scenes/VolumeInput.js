import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    PixelRatio,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationStyles } from '@exponent/ex-navigation';
import NumTextInput from 'react-native-num-textinput';

import { INPUT_TYPE, OUTPUT_TYPE } from '../app/constants/constants';
import { volumeDidUpdate } from '../app/modules/leakage/leakage.actions';

class VolumeInput extends Component {

    static route = {
        navigationBar: {
            visible: false,
            title: 'Measurement',
        },
        styles: {
            ...NavigationStyles.SlideVertical,
        }
    }

    constructor(props) {
        super(props);
        this.state = { 
            text: this.props.volume > 0 ? this.props.volume.toString() : '' 
        };
        this.onCancel = this.onCancel.bind(this);
        this.onDone = this.onDone.bind(this);
    }

    onCancel() {
        this.props.navigator.pop();
    }

    onDone() {
        const { dispatch } = this.props;
        dispatch(
            volumeDidUpdate(
                parseInt(this.state.text, 0),
                this.props.id,
                this.props.type
            )
        );
        this.props.navigator.pop();
    }

    getTitle() {
        switch (this.props.type) {
            case INPUT_TYPE:
                return 'What is the volume of fluid intake today?';
            case OUTPUT_TYPE:
                return 'What is the volume of leakage today?';
            default:
                return '';
        }
    }

    isValid() {
        let valid = parseInt(this.state.text, 0) > 100;
        if (this.props.volume && valid) {
            valid = this.props.volume !== parseInt(this.state.text, 0);
        }
        return valid;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Button title='Cancel' onPress={this.onCancel} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.text}>"{this.getTitle()}"</Text>
                </View>
                <View style={styles.inputView}>
                    <NumTextInput
                        placeholder='tap to answer'
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.bottomView}>
                    <Button 
                        title='Done' 
                        onPress={this.onDone} 
                        disabled={!this.isValid()}
                    />
                </View>
            </View>
        );
    }
}

VolumeInput.propTypes = {
    type: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    volume: PropTypes.number,
    // date: PropTypes.string.isRequired,
};

VolumeInput.defaultProps = {
    volume: 0,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1 / PixelRatio.get(),
    },
    text: {
        fontSize: 26,
        textAlign: 'center',
    },
    topView: {
        flex: 1, 
        alignItems: 'flex-end', 
        justifyContent: 'flex-start',
    },
    inputView: {
        flex: 2,
        paddingTop: 20,
    },
    bottomView: {
        flex: 4,
        justifyContent: 'flex-start',
        paddingBottom: 20,
    },
});

export default connect()(VolumeInput);
