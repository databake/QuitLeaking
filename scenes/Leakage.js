import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Alert,
} from 'react-native';

import WeekSlider from '../components/WeekSlider';
import TodaySummary from '../components/TodaySummary';
import LeakList from '../components/LeakList';
import Colors from '../constants/Colors';
import TodayButton from '../components/TodayButton';

const onButtonPress = () => {
  Alert.alert('Today butt has been pressed!');
};

class Leakage extends Component {

    static route = {
        navigationBar: {
            title: 'Leakage',
            tintColor: Colors.leakageTintColor,
            titleStyle: { color: 'black' },
            renderRight: () => <TodayButton 
                tintColor={Colors.leakageTintColor} 
                onButtonPress={onButtonPress} 
            />,
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={styles.horizontalScrollView}>
                            <WeekSlider color={Colors.leakageTintColor} />
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
                            <LeakList />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

Leakage.propTypes = {
    // actions: PropTypes.object.isRequired,
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

export default Leakage;
