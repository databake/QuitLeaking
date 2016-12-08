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
    }

    static defaultProps = {
        color: 'red',
    }

    render() {
        return (
            <ScrollView horizontal contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    <SmallCircleProgress progress={1} day="S" color={this.props.color} />
                    <SmallCircleProgress progress={0.5} day="M" color={this.props.color} />
                    <SmallCircleProgress progress={0.5} day="T" color={this.props.color} />
                    <SmallCircleProgress progress={1} day="W" color={this.props.color} />
                    <SmallCircleProgress progress={1} day="T" color={this.props.color} />
                    <SmallCircleProgress 
                        progress={0.25} 
                        day="F" 
                        color={this.props.color} 
                        highLighted 
                    />
                    <SmallCircleProgress progress={0.5} day="S" color={this.props.color} />
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
