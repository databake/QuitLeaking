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
        data: PropTypes.array.isRequired,
    }

    static defaultProps = {
        color: 'red',
    }

    render() {
        const today = new Date();
        const selectedIndex = today.getDay();
        const rows = this.props.data.map((i, index) => (
            <SmallCircleProgress
                key={index}
                progress={(i.long_done + i.short_done) / (i.long_goal + i.short_goal)}
                day={i.day_text}
                color={this.props.color}
                highLighted={index === selectedIndex}
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
