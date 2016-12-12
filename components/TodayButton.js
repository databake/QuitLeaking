import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Colors from '../constants/Colors';
import { setDailySessions } from '../app/modules/squeezes/squeeze.actions';

export default class TodayButton extends Component {

    static propTypes = {
        dailySessions: PropTypes.number.isRequired,
    }

    onButtonPress = () => this.props.dispatch(
        setDailySessions(this.props.dailySessions + 1)
    );

    render() {
        console.log(this.props);
        return (
            <View style={styles.container}>
                <Button
                    color={Colors.tintColor}
                    title='Today'
                    onPress={this.onButtonPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10,
    },
});

