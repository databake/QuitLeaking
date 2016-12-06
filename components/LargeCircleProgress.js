import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Progress from 'react-native-progress'

export default class LargeCircleProgress extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string,
        progress: PropTypes.number.isRequired,
        color: PropTypes.string,
    }

    static defaultProps = {
        subTitle: '',
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <Progress.Circle 
                        borderWidth={0}
                        unfilledColor='#ECF0F1'
                        showsText
                        textStyle={styles.percentageText}
                        size={100} 
                        progress={this.props.progress} 
                        thickness={10} 
                        color={this.props.color} 
                        style={styles.progress} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.boldText}>{this.props.title}</Text>
                    <Text style={styles.subTitle}>{this.props.subTitle}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    progress: {
        margin: 10,
        flex: 1,
    },
    textContainer: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',       
    },
    progressContainer: {
        flex: 6,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        margin: 5,
    },
    percentageText: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
    },
    boldText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '200',
    }
})