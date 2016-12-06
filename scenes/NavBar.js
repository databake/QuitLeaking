import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
} from 'react-native';

export default class NavBar extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Squeeze Card</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#efefef',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomColor: 'rgba(0, 0, 0, 0.2)'
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
    },
})