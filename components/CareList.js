import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import CareListRow from '../components/CareListRow';

export default class CareList extends Component {


    render() {
        const subHeading = 
        `(${this.props.longRepetitions} slow, ${this.props.shortRepetitions} quick squeezes)`;
    
        const tmp = [];
        for (let i = 0; i < this.props.dailySessions; i++) {
            tmp.push(i);
        }

        // TODO: pass a function to call the reducer on state change.
        const rows = tmp.map((index) => (
            <CareListRow
                key={index}
                title={`${index + 1} of ${this.props.dailySessions}`}
                subTitle={subHeading}
                color='royalblue'
                slowComplete={false} // TOOD: get the state.
                quickComplete={false} // TOOD: get the state.
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
