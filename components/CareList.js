import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import CareListRow from '../components/CareListRow';

export default class CareList extends Component {

    render() {
        return (
            <View style={styles.container}>
                <CareListRow 
                    title='1 of 4' 
                    subTitle='(10 slow, 10 quick squeezes)' 
                    color='goldenrod' 
                    slowComplete
                    quickComplete
                />
                <CareListRow 
                    title='2 of 4' 
                    subTitle='(10 slow, 10 quick squeezes)' 
                    color='mediumpurple'
                    slowComplete
                />
                <CareListRow 
                    title='3 of 4' 
                    subTitle='(10 slow, 10 quick squeezes)' 
                    color='mediumseagreen' 
                />
                <CareListRow 
                    title='4 of 4' 
                    subTitle='(10 slow, 10 quick squeezes)' 
                    color='steelblue' 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
