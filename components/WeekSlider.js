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
    }

    static defaultProps = {
        color: 'red',
    }

    render() {
        const today = new Date();
        const selectedIndex = today.getDay();
        let rows;
        if (this.props.data) {
            rows = this.props.data.map((i, index) => (
                <SmallCircleProgress
                    key={index}
                    progress={(i.long_done + i.short_done) / (i.long_goal + i.short_goal)}
                    day={i.day_text}
                    color={this.props.color}
                    highLighted={index === selectedIndex}
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
                    highLighted={i === selectedIndex}
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
