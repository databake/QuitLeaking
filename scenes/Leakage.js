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
import Router from '../navigation/Router';

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
        this.onRowPress = this.onRowPress.bind(this);
    }

    onRowPress() {
        this.props.navigator.push(
            Router.getRoute('volumeInput')
        );
    }

    render() {
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
                                subTitle='3rd December, 2016'
                                progress={0.5}
                                color={Colors.leakageTintColor} 
                            />
                        </View >
                        <View style={styles.careList}>
                            <LeakList 
                                onPress={this.onRowPress}
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

