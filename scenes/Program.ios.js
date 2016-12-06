import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';

import Colors from '../constants/Colors';
import SettingsList from 'react-native-settings-list';

class Program extends Component {

    static route = {
        navigationBar: {
            title: 'Settings',
            tintColor: Colors.tintColor,
            titleStyle: {color: 'black'},
        },
    };

    constructor(props, context) {
        super(props, context);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = { switchValue: true };
    }

    render() {
        return (
            <View style={styles.container}>
                <SettingsList
                    borderColor='rgba(0, 0, 0, 0.1)'
                    defaultItemSize={50}>
                    <SettingsList.Header 
                        headerText='Schedule' 
                        headerStyle={styles.headerStyle} />
                    <SettingsList.Item 
                        titleInfo='4' 
                        hasNavArrow={true} 
                        title='Exercises per day'
                        onPress={() => Alert.alert('Exercises per day')}/>

                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.state.switchValue}
                        switchOnValueChange={this.onValueChange}
                        hasSwitch={true}
                        title='Reminders' />
                    <SettingsList.Item 
                        title='Reminder Settings'
                        onPress={() => Alert.alert('Reminder settings')}/>

                    <SettingsList.Header 
                        headerText='Slow Exercises' 
                        headerStyle={styles.headerStyle} />

                    <SettingsList.Item 
                        titleInfo='10' 
                        hasNavArrow={true} 
                        title='Repetitions'
                        onPress={() => Alert.alert('Slow Repetitions')}/>

                    <SettingsList.Item 
                        titleInfo='10 seconds' 
                        hasNavArrow={true} 
                        title='Squeeze time'
                        onPress={() => Alert.alert('Slow Squeeze Time')}/>

                    <SettingsList.Item 
                        titleInfo='10 seconds' 
                        hasNavArrow={true} 
                        title='Relax time'
                        onPress={() => Alert.alert('Slow Squeeze Relax Time')}/>

                    <SettingsList.Header 
                        headerText='Quick Exercises' 
                        headerStyle={styles.headerStyle} />

                    <SettingsList.Item 
                        titleInfo='10' 
                        hasNavArrow={true} 
                        title='Repetitions'
                        onPress={() => Alert.alert('Fast Repetitions')}/>

                </SettingsList>
            </View>
        )
    }

    onValueChange(value) {
        this.setState({switchValue: value});
    };

}


Program.propTypes = {
    // actions: PropTypes.object.isRequired,
    // posts: PropTypes.arrayOf(PropTypes.object)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    titleInfoStyle: {
        fontSize: 16,
        color: '#8e8e93',
    },
    headerStyle: {
        color: 'gray', 
        marginTop: 15,
        paddingLeft: 8,
    }
})

export default Program