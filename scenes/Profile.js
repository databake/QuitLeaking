import React, { Component, PropTypes } from 'react';
    import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Colors from '../constants/Colors';

class Profile extends Component {

    static route = {
        navigationBar: {
            title: 'Profile',
            tintColor: Colors.tintColor,
            titleStyle: { color: 'black' },
        },
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>I am Profile</Text>
            </View>
        )
    }
}

Profile.propTypes = {
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

export default Profile