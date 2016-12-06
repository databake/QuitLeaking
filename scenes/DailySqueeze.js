import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

import WeekSlider from '../components/WeekSlider';
import TodaySummary from '../components/TodaySummary';
import CareList from '../components/CareList';
import Colors from '../constants/Colors';
import TodayButton from '../components/TodayButton';

const onButtonPress = () => {
  Alert.alert('Today has been pressed!');
};

export default class QuitLeaking extends Component {

  static route = {
    navigationBar: {
      title: 'Squeeze',
      tintColor: Colors.tintColor,
      titleStyle: {color: 'black'},
      renderRight: (route, props) => <TodayButton tintColor={Colors.tintColor} onButtonPress={onButtonPress}/>,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView  >
          <View style={{ flex: 1 }}>
            <View style={styles.horizontalScrollView}>
              <WeekSlider color={Colors.brandColor} />
            </View>
            <View style={styles.todaySummary} >
              <TodaySummary
                title='Squeeze Completion'
                subTitle='3rd December, 2016'
                progress={0.33}
                color={Colors.brandColor} />
            </View >
            <View style={styles.careList}>
              <CareList />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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