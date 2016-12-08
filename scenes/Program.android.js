import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';

import SettingsList from 'react-native-settings-list';

class Program extends Component {

    static route = {
        navigationBar: {
            visible: false,
        },
    };

    constructor(props, context) {
        super(props, context);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = { switchValue: true };
    }

    onValueChange(value) {
        this.setState({ switchValue: value });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>
                <SettingsList
                    borderColor='rgba(0, 0, 0, 0.1)'
                    defaultItemSize={50}
                >
                    <SettingsList.Header 
                        headerStyle={styles.headerStyle} 
                    />
                    <SettingsList.Item 
                        title='Schedule'
                        borderHide={'Both'}
                        hasNavArrow={false}
                        itemWidth={70}
                        titleStyle={styles.titleStyle} 
                    />

                    <SettingsList.Item 
                        titleInfo='4' 
                        hasNavArrow={false} 
                        title='Exercises per day'
                        borderHide={'Both'}
                        onPress={() => Alert.alert('Exercises per day')}
                    />

                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.state.switchValue}
                        switchOnValueChange={this.onValueChange}
                        hasSwitch
                        title='Reminders'
                        borderHide={'Both'}
                    />
                    <SettingsList.Item 
                        title='Reminder Settings'
                        hasNavArrow={false}
                        borderHide={'Both'}
                        onPress={() => Alert.alert('Reminder settings')} 
                    />

                    <SettingsList.Header 
                        headerStyle={styles.headerStyle}
                    />

                    <SettingsList.Item 
                        title='Slow Exercises'
                        borderHide={'Both'}
                        hasNavArrow={false}
                        itemWidth={70}
                        titleStyle={styles.titleStyle}
                    />

                    <SettingsList.Item 
                        titleInfo='10' 
                        hasNavArrow={false} 
                        borderHide={'Both'}
                        title='Repetitions'
                        onPress={() => Alert.alert('Slow Repetitions')} 
                    />

                    <SettingsList.Item 
                        titleInfo='10 seconds' 
                        hasNavArrow={false} 
                        borderHide={'Both'}
                        title='Squeeze time'
                        onPress={() => Alert.alert('Slow Squeeze Time')} 
                    />

                    <SettingsList.Item 
                        titleInfo='10 seconds' 
                        hasNavArrow={false} 
                        borderHide={'Both'}
                        title='Relax time'
                        onPress={() => Alert.alert('Slow Squeeze Relax Time')} 
                    />

                    <SettingsList.Header 
                        headerStyle={styles.headerStyle}
                    />

                    <SettingsList.Item 
                        title='Quick Exercises'
                        borderHide={'Both'}
                        hasNavArrow={false}
                        itemWidth={70}
                        titleStyle={styles.titleStyle}
                    />

                    <SettingsList.Item 
                        titleInfo='10' 
                        hasNavArrow={false} 
                        borderHide={'Both'}
                        title='Repetitions'
                        onPress={() => Alert.alert('Fast Repetitions')} 
                    />

                </SettingsList>
            </View>
        );
    }
}

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
        marginTop: -5,
    },
    titleStyle: {
        color: '#009688', 
        marginBottom: 10, 
        fontWeight: '500',
    },
    header: {
        borderBottomWidth: 1, 
        backgroundColor: '#263238', 
        borderColor: '#c8c7cc',
    },
    headerTitle: {
        color: 'white', 
        marginTop: 20, 
        marginBottom: 20, 
        marginLeft: 15, 
        fontWeight: 'bold', 
        fontSize: 20,
    },
});

export default Program;
