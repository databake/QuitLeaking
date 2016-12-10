import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WeekSlider from '../components/WeekSlider';
import TodaySummary from '../components/TodaySummary';
import CareList from '../components/CareList';
import Colors from '../constants/Colors';
import TodayButton from '../components/TodayButton';
import * as squeezesActions from '../app/modules/squeezes/squeeze.actions';

const onButtonPress = () => {
  Alert.alert('Ho');
};

class QuitLeaking extends Component {

  static route = {
    navigationBar: {
      title: 'Squeeze',
      tintColor: Colors.tintColor,
      titleStyle: { color: 'black' },
      renderRight: () => <TodayButton
        tintColor={Colors.tintColor}
        onButtonPress={onButtonPress}
      />,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView >
          <View style={{ flex: 1 }}>
            <View style={styles.horizontalScrollView}>
              <WeekSlider color={Colors.brandColor} />
            </View>
            <View style={styles.todaySummary} >
              <TodaySummary
                title='Squeeze Completion'
                subTitle='3rd December, 2016'
                progress={0.33}
                color={Colors.brandColor}
              />
            </View >
            <View style={styles.careList}>
              <CareList 
                longRepetitions={this.props.longRepetitions}
                shortRepetitions={this.props.shortRepetitions}
                dailySessions={this.props.dailySessions}
              />
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

QuitLeaking.propTypes = {
  actions: PropTypes.object.isRequired,
  longInterval: PropTypes.number.isRequired,
  longRepetitions: PropTypes.number.isRequired,
  shortRepetitions: PropTypes.number.isRequired,
  dailySessions: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    longInterval: state.squeezes.longInterval,
    longRepetitions: state.squeezes.longRepetitions,
    shortRepetitions: state.squeezes.shortRepetitions,
    dailySessions: state.squeezes.dailySessions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(squeezesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuitLeaking);


