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
import CareList from '../components/CareList';
import Colors from '../constants/Colors';
import _TodayButton from '../components/TodayButton';
import * as squeezesActions from '../app/modules/squeezes/squeeze.actions';

const TodayButton = connect(
  state => ({
    dailySessions: state.squeezes.config.dailySessions
  })
)(_TodayButton);

class QuitLeaking extends Component {

  static route = {
    navigationBar: {
      title: 'Squeeze',
      tintColor: Colors.tintColor,
      titleStyle: { color: 'black' },
      renderRight: () => <TodayButton />,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.onDoneChanged = this.onDoneChanged.bind(this);
    this.onSelectedIndexChanged = this.onSelectedIndexChanged.bind(this);
  }

  // TODO: Move this to the reducer
  onLongChanged(sessionId, buttonType, value) {
      const results = this.props.thisWeeksData[this.props.selectedIndex].longDone.slice(0);
      results[sessionId] = value;
      this.props.actions.updateLongResults(this.props.selectedIndex, results);    
  }

  // TODO: Move this to the reducer
  onShortChanged(sessionId, buttonType, value) {
      const results = this.props.thisWeeksData[this.props.selectedIndex].shortDone.slice(0);
      results[sessionId] = value;
      this.props.actions.updateShortResults(this.props.selectedIndex, results);
  }

  onDoneChanged(sessionId, buttonType, value) {
    if (buttonType === 0) {
      this.onLongChanged(sessionId, buttonType, value);
    } else {
      this.onShortChanged(sessionId, buttonType, value);
    }
  }

  onSelectedIndexChanged(index) {
    this.props.actions.setSelectedIndex(index);
  }

  getDoneSqueezes() {
    const today = this.props.thisWeeksData[this.props.selectedIndex];
    const { longDone = [0, 0, 0], shortDone = [0, 0, 0] } = today;
    return { long: longDone, short: shortDone };
  }
  
  render() {
    const selectedDay = this.props.thisWeeksData[this.props.selectedIndex];

    return (
      <View style={styles.container}>
        <ScrollView >
          <View style={{ flex: 1 }}>
            <View style={styles.horizontalScrollView}>
              <WeekSlider
                color={Colors.brandColor}
                data={this.props.thisWeeksData}
                selectedIndex={this.props.selectedIndex}
                onButtonPress={this.onSelectedIndexChanged}
              />
            </View>
            <View style={styles.todaySummary} >
              <TodaySummary
                title='Squeeze Completion'
                subTitle={selectedDay.date.format('LL')}
                progress={selectedDay.percentage}
                color={Colors.brandColor}
              />
            </View >
            <View style={styles.careList}>
              <CareList
                longRepetitions={this.props.longRepetitions}
                shortRepetitions={this.props.shortRepetitions}
                dailySessions={this.props.dailySessions}
                doneLong={this.getDoneSqueezes().long}
                doneShort={this.getDoneSqueezes().short}
                onDoneChanged={this.onDoneChanged}
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
  thisWeeksData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  const { squeezes } = state;
  const { config } = squeezes;
  // console.log(config);
  const { squeezeDays, selected } = squeezes;
  const { longInterval, longRepetitions, shortRepetitions, dailySessions } = config;
  return {
    longInterval,
    longRepetitions,
    shortRepetitions,
    dailySessions,
    thisWeeksData: squeezeDays,
    selectedIndex: selected.dayIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(squeezesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuitLeaking);
