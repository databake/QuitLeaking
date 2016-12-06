import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { NavigationStyles } from '@exponent/ex-navigation';

class SqueezeNow extends Component {

    static route = {
        navigationBar: {
            visible: false,
        },
        styles: {
            ...NavigationStyles.SlideVertical
        }
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>I am SqueezeNow</Text>
            </View>
        )
    }
}

SqueezeNow.propTypes = {
    // actions: PropTypes.object.isRequired,
    // posts: PropTypes.arrayOf(PropTypes.object)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SqueezeNow