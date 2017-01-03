import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import moment from 'moment';

import SmallCircleProgress from '../components/SmallCircleProgress';

export default class WeekSlider extends Component {

    static propTypes = {
        color: PropTypes.string,
        data: PropTypes.array,
        selectedIndex: PropTypes.number.isRequired
    }

    static defaultProps = {
        color: 'red',
    }

    render() {
        const rows = this.props.data.map((dayObject, index) => (
            <SmallCircleProgress
                key={index}
                progress={dayObject.percentage}
                day={moment(dayObject.date).format('dd')}
                color={this.props.color}
                highLighted={dayObject.id === this.props.selectedIndex}
                dayIndex={index}
                onButtonPress={this.props.onButtonPress}
            />
        ));

        return (
            <ScrollView horizontal contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    {rows}
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 5,
    },
});
