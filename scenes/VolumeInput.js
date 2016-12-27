import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    PixelRatio,
} from 'react-native';

import { NavigationStyles } from '@exponent/ex-navigation';
import NumTextInput from 'react-native-num-textinput';

class VolumeInput extends Component {

    static route = {
        navigationBar: {
            visible: false,
            title: 'Measurement',
        },
        styles: {
            ...NavigationStyles.SlideVertical
        }
    }

    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.onCancel = this.onCancel.bind(this);
        this.onDone = this.onDone.bind(this);
    }

    onCancel() {
        this.props.navigator.pop();
    }

    onDone() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Button title='Cancel' onPress={this.onCancel} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.text}>What is the volume of leakage today?</Text>
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
                        disabled={this.state.text.length === 0}
                    />
                </View>
            </View>
        );
    }
}

VolumeInput.propTypes = {
    // actions: PropTypes.object.isRequired,
    // posts: PropTypes.arrayOf(PropTypes.object)
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

export default VolumeInput;
