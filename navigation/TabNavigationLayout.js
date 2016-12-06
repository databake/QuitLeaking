import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    StackNavigation,
    TabNavigation,
    TabNavigationItem as TabItem,
    NavigationProvider,
} from '@exponent/ex-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import Router from './Router';


export default class TabNavigationLayout extends Component {

    static route = {
        navigationBar: {
            visible: true,
        }
    }

    render() {
        return (
            <NavigationProvider router={Router}>
                <TabNavigation
                    id="main"
                    navigatorUID="main"
                    initialTab="squeeze">
                    <TabItem
                        id="squeeze"
                        renderIcon={isSelected => this._renderIcon('Squeeze', 'ios-heart-outline', 'ios-heart', isSelected)}>
                        <StackNavigation
                            id="squeeze"
                            navigatorUID="squeeze"
                            initialRoute={Router.getRoute('squeeze')}
                            />
                    </TabItem>

                    <TabItem
                        id="leakage"
                        renderIcon={isSelected => this._renderIcon('Leakage', 'ios-flask-outline', 'ios-flask', isSelected)}>
                        <StackNavigation
                            id="leakage"
                            initialRoute={Router.getRoute('leakage')}
                            />
                    </TabItem>

                    <TabItem
                        id="insights"
                        renderIcon={isSelected => this._renderIcon('Insights', 'ios-stats-outline', 'ios-stats', isSelected)}>
                        <StackNavigation
                            id="insights"
                            initialRoute={Router.getRoute('insights')}
                            />
                    </TabItem>

                    <TabItem
                        id="program"
                        renderIcon={isSelected => this._renderIcon('Program', 'ios-notifications-outline', 'ios-notifications', isSelected)}>
                        <StackNavigation
                            id="program"
                            initialRoute={Router.getRoute('program')}
                            />
                    </TabItem>

                    <TabItem
                        id="profile"
                        renderIcon={isSelected => this._renderIcon('Profile', 'ios-contact-outline', 'ios-contact', isSelected)}>
                        <StackNavigation
                            id="profile"
                            initialRoute={Router.getRoute('profile')}
                            />
                    </TabItem>

                </TabNavigation>
            </NavigationProvider>
        )
    }

    _renderIcon(title: string, iconName: string, selectedIconName: string, isSelected: bool): ReactElement<any> {
        let color = isSelected ? Colors.tabIconSelected : Colors.tabIconDefault;
        let tabIconName = isSelected ? selectedIconName : iconName ;

        return (
            <View style={styles.tabItemContainer}>
                <Icon name={tabIconName} size={32} color={color} />

                <Text style={[styles.tabTitleText, { color }]} numberOfLines={1}>
                    {title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabTitleText: {
        fontSize: 11,
    },
})