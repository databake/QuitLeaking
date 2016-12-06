import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    ScrollView,
    Button,
    Alert,
} from 'react-native';

import ChartRow from '../components/ChartRow';
import Colors from '../constants/Colors';

class Insights extends Component {

    constructor(props, context) {
        super(props, context);
    }

    static route = {
        navigationBar: {
            title: 'Insights',
            tintColor: Colors.tintColor,
            titleStyle: {color: 'black'},

        },
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Weekly Charts</Text>
                    </View>
                    <View style={styles.subHeader}>
                        <Text style={styles.subHeaderTitle}>Training Adherence</Text>
                        <Text style={styles.subHeaderSubTitle}>Your training adherence was 75% last week.</Text>
                    </View>
                    <View style={styles.spacer} />
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Chart Title</Text>
                        <ChartRow
                            day='Fri'
                            date='15/12'
                            topValue={7}
                            topTitle='70%'
                            bottomValue={0}
                            bottomTitle='N/A' />
                        <ChartRow
                            day='Sat'
                            date='16/12'
                            topValue={8}
                            topTitle='80%'
                            bottomValue={0}
                            bottomTitle='N/A' />
                        <ChartRow
                            day='Sun'
                            date='17/12'
                            topValue={8}
                            topTitle='80%'
                            bottomValue={10}
                            bottomTitle='100%' />
                        <ChartRow
                            day='Mon'
                            date='18/12'
                            topValue={6}
                            topTitle='60%'
                            bottomValue={8}
                            bottomTitle='80%' />
                        <ChartRow
                            day='Tue'
                            date='19/12'
                            topValue={5}
                            topTitle='50%'
                            bottomValue={10}
                            bottomTitle='100%' />
                        <ChartRow
                            day='Wed'
                            date='20/12'
                            topValue={5}
                            topTitle='50%'
                            bottomValue={10}
                            bottomTitle='100%' />
                        <ChartRow
                            day='Thu'
                            date='21/12'
                            topValue={7}
                            topTitle='70%'
                            bottomValue={10}
                            bottomTitle='100%' />
                    </View>
                </View>
            </ScrollView>
        )


    }
}

Insights.propTypes = {
    // actions: PropTypes.object.isRequired,
    // posts: PropTypes.arrayOf(PropTypes.object)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        flex: 1,
        padding: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    headerText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'gray',
    },
    subHeader: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1 / PixelRatio.get(),
        backgroundColor: 'white',
    },
    subHeaderTitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    subHeaderSubTitle: {
        fontSize: 16,
        fontWeight: '200',
    },
    spacer: {
        height: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    },
    chartContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1 / PixelRatio.get(),
        backgroundColor: 'white',
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default Insights