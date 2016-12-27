import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WeekSlider from '../components/WeekSlider';
import TodaySummary from '../components/TodaySummary';
import LeakList from '../components/LeakList';
import Colors from '../constants/Colors';
import _TodayButton from '../components/TodayButton';
import * as leakageActions from '../app/modules/leakage/leakage.actions';

const TodayButton = connect(
  state => ({
    dailySessions: state.squeezes.config.dailySessions
  })
)(_TodayButton);

class Leakage extends Component {

    static route = {
        navigationBar: {
            title: 'Leakage',
            tintColor: Colors.leakageTintColor,
            titleStyle: { color: 'black' },
            renderRight: () => <TodayButton />,        
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        this.onSelectedIndexChanged = this.onSelectedIndexChanged.bind(this);
    }

    onSelectedIndexChanged(index) {
        this.props.actions.setSelectedIndex(index);
    }

    currentDay() {
        return this.props.leakageWeek[this.props.leakageSelectedIndex];
    }

    render() {
        const { percentage, date } = this.currentDay();

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={styles.horizontalScrollView}>
                            <WeekSlider 
                                color={Colors.leakageTintColor} 
                                data={this.props.leakageWeek}
                                selectedIndex={this.props.leakageSelectedIndex}
                                onButtonPress={this.onSelectedIndexChanged}
                            />
                        </View>
                        <View style={styles.todaySummary} >
                            <TodaySummary
                                title='Fluid Leakage'
                                subTitle={date.format('LL')}
                                progress={percentage}
                                color={Colors.leakageTintColor} 
                            />
                        </View >
                        <View style={styles.careList}>
                            <LeakList 
                                leakDay={this.currentDay()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

Leakage.propTypes = {
    leakageSelectedIndex: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    // posts: PropTypes.arrayOf(PropTypes.object)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    todaySummary: {
        flex: 2,
    },
    careList: {
        flex: 6,
    },
    horizontalScrollView: {
        height: 70
    }
});

function mapStateToProps(state) {
    console.log(state);
    const { leakageSelectedIndex, leakageWeek } = state.leakage;
    return {
        leakageSelectedIndex,
        leakageWeek,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(leakageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Leakage);

