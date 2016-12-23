import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import CareListRow from '../components/CareListRow';

export default class CareList extends Component {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress(sessionIndex, squeezeIndex, value) {
        // console.log(`Id: ${sessionIndex} Squeeze: ${squeezeIndex} Value: ${value}`);
        this.props.onDoneChanged(sessionIndex, squeezeIndex, value);
    }

    formatTitle(index, dailySessions) {
        return `${index + 1} of ${dailySessions}`;
    }

    formatSubTitle(slowCount, shortCount) {
        const slow = `(${slowCount} slow, `;
        const short = `${shortCount} quick squeezes)`;
        return slow + short;
    }

    render() {     
        const { 
            dailySessions = 0, 
            longRepetitions = 0, 
            shortRepetitions = 0,
            doneLong,
            doneShort
        } = this.props;

        const rows = new Array(dailySessions).fill(0).map((value, index) => (
            <CareListRow
                key={index}
                title={this.formatTitle(index, dailySessions)}
                subTitle={this.formatSubTitle(longRepetitions, shortRepetitions)}
                color='royalblue'
                slowComplete={doneLong[index]} 
                quickComplete={doneShort[index]}
                sessionIndex={index}
                onPress={this.onPress}
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
    doneLong: PropTypes.arrayOf(PropTypes.number).isRequired,
    doneShort: PropTypes.arrayOf(PropTypes.number).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
