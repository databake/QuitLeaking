import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import CareListRow from '../components/CareListRow';

export default class CareList extends Component {


    render() {
        const sub = 
        `(${this.props.longRepetitions} slow, ${this.props.shortRepetitions} quick squeezes)`;
    
        const tmp = [];
        for (let i = 0; i < this.props.dailySessions; i++) {
            tmp.push(i);
        }

        const rows = tmp.map((i) => (
            <CareListRow
                key={i}
                title={`${i + 1} of ${this.props.dailySessions}`}
                subTitle={sub}
                color='royalblue'
                slowComplete={false}
                quickComplete={false}
            />
        ));

        return (
            <View style={styles.container}>
                {rows}
            </View>
        );
    }
}

CareList.propTypes = {
    longRepetitions: PropTypes.number.isRequired,
    shortRepetitions: PropTypes.number.isRequired,
    dailySessions: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
