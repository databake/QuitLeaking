import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import WeekSlider from '../components/WeekSlider';
import TodaySummary from '../components/TodaySummary';
import CareList from '../components/CareList';
import Colors from '../constants/Colors';
import _TodayButton from '../components/TodayButton';
import * as squeezesActions from '../app/modules/squeezes/squeeze.actions';

const TodayButton = connect(
  state => ({
    dailySessions: state.squeezes.dailySessions
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
    this.selectedProgress = this.selectedProgress.bind(this);
  }

  componentWillMount() {
    this.props.actions.getThisWeeksSqueezes();
  }

  selectedProgress() {
    //TODO: move this into redux
    const sData = this.props.thisWeeksData[this.props.selectedIndex];
    if (sData) {
      const totalDone = (sData.long_done + sData.short_done);
      const totalGoal = (sData.long_goal + sData.short_goal);
      const progress = (totalDone / totalGoal);
      return progress;
    }
    return 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView >
          <View style={{ flex: 1 }}>
            <View style={styles.horizontalScrollView}>
              <WeekSlider 
                color={Colors.brandColor} 
                data={this.props.thisWeeksData}
              />
            </View>
            <View style={styles.todaySummary} >
              <TodaySummary
                title='Squeeze Completion'
                subTitle={moment().format('LL')}
                progress={this.selectedProgress()}
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
  thisWeeksData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    longInterval: state.squeezes.longInterval,
    longRepetitions: state.squeezes.longRepetitions,
    shortRepetitions: state.squeezes.shortRepetitions,
    dailySessions: state.squeezes.dailySessions,
    thisWeeksData: state.squeezes.thisWeeksSqueezes,
    selectedIndex: state.squeezes.selectedIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(squeezesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuitLeaking);
