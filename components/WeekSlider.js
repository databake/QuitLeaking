import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

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
        let rows;
        if (this.props.data) {
            rows = this.props.data.map((dayObject, index) => (
                <SmallCircleProgress
                    key={index}
                    progress={dayObject.percentage}
                    day={dayObject.date.format('dd')}
                    color={this.props.color}
                    highLighted={index === this.props.selectedIndex}
                    dayIndex={index}
                    onButtonPress={this.props.onButtonPress}
                />
            ));
        } else {
            const itArray = [0, 1, 2, 3, 4, 5, 6];
            const dayArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            rows = itArray.map((i) => (
                 <SmallCircleProgress
                    key={i}
                    progress={0}
                    day={dayArray[i]}
                    color={this.props.color}
                    highLighted={i === this.props.selectedIndex}
                    dayIndex={i}
                 />
            ));
        }

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
