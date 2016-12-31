import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    ScrollView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import ChartRow from '../components/ChartRow';
import Colors from '../constants/Colors';
import * as insightActions from '../app/modules/insight/insight.actions';

class Insights extends Component {

    static route = {
        navigationBar: {
            title: 'Insights',
            tintColor: Colors.tintColor,
            titleStyle: { color: 'black' },
        },
    };

    formatPercentage(perc) {
        if (perc && perc > 0) {
            return `${perc * 100}%`;
        }
        return 'N/A';
    }

    formatDayName(interval) {
        return moment.unix(interval).format('ddd');
    }

    formatDate(interval) {
        return moment.unix(interval).format('D/M');
    }

    render() {
        const rows = this.props.currentWeek.map((dayObject, index) => (
            <ChartRow
                key={index}
                day={this.formatDayName(dayObject.id)}
                date={this.formatDate(dayObject.id)}
                topValue={dayObject.squeezePerc * 10}
                topTitle={this.formatPercentage(dayObject.squeezePerc)}
                bottomValue={dayObject.leakagePerc * 10}
                bottomTitle={this.formatPercentage(dayObject.leakagePerc)}
            />
        ));

        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Weekly Charts</Text>
                    </View>
                    <View style={styles.subHeader}>
                        <Text style={styles.subHeaderTitle}>Training Adherence</Text>
                        <Text style={styles.subHeaderSubTitle}>
                            Your training adherence was 75% last week.
                        </Text>
                    </View>
                    <View style={styles.spacer} />
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Chart Title</Text>
                        {rows}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

Insights.propTypes = {
    // actions: PropTypes.object.isRequired,
    // posts: PropTypes.arrayOf(PropTypes.object)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
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
});

function mapStateToProps(state) {
    const { insight } = state;
    const { currentWeek } = insight;
    return {
        currentWeek,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(insightActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Insights);

