import React, { Component } from 'react';
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

    render() {
        return (
            <View style={styles.container}>
                <Text>I am Profile</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Profile;
