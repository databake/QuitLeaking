import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  PixelRatio,
} from 'react-native';

import LargeCircleProgress from '../components/LargeCircleProgress';

export default class TodaySummary extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string,
        progress: PropTypes.number.isRequired,
        color: PropTypes.string,
    }

    static defaultProps = {
        subTitle: '',
        color: 'red',
    }

    render() {
        return (
            <View style={styles.container}>
                <LargeCircleProgress 
                    title={this.props.title} 
                    subTitle={this.props.subTitle}
                    progress={this.props.progress} 
                    color={this.props.color}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopColor: 'rgba(0, 0, 0, 0.2)',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
    },
});
