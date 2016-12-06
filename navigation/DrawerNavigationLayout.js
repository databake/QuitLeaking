import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    StackNavigation,
    DrawerNavigation,
    DrawerNavigationItem,
    NavigationProvider,
} from '@exponent/ex-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import Router from './Router';
import { RegularText } from '../components/StyledText';
import LinearGradient from 'react-native-linear-gradient';

export default class TabNavigationLayout extends Component {

    static route = {
        navigationBar: {
            visible: true,
        }
    }

    render() {
        return (
            <NavigationProvider router={Router}>
                <DrawerNavigation
                    id="main"
                    navigatorUID="main"
                    drawerWidth={300}
                    renderHeader={this._renderHeader}
                    initialItem="squeeze">
                    <DrawerNavigationItem
                        id="squeeze"
                        selectedStyle={styles.selectedItemStyle}
                        renderTitle={isSelected => this._renderTitle('Squeeze', isSelected)}
                        renderIcon={isSelected => this._renderIcon('md-heart', isSelected)}>
                        <StackNavigation
                            id="squeeze"
                            navigatorUID="squeeze"
                            tintColor='red'
                            initialRoute={Router.getRoute('squeeze')}
                            />
                    </DrawerNavigationItem>

                    <DrawerNavigationItem
                        id="leakage"
                        selectedStyle={styles.selectedItemStyle}
                        renderTitle={isSelected => this._renderTitle('Leakage', isSelected)}
                        renderIcon={isSelected => this._renderIcon('md-flask', isSelected)}>
                        <StackNavigation
                            id="leakage"
                            initialRoute={Router.getRoute('leakage')}
                            />
                    </DrawerNavigationItem>

                    <DrawerNavigationItem
                        id="insights"
                        selectedStyle={styles.selectedItemStyle}
                        renderTitle={isSelected => this._renderTitle('Insights', isSelected)}
                        renderIcon={isSelected => this._renderIcon('md-stats', isSelected)}>
                        <StackNavigation
                            id="insights"
                            initialRoute={Router.getRoute('insights')}
                            />
                    </DrawerNavigationItem>

                    <DrawerNavigationItem
                        id="program"
                        selectedStyle={styles.selectedItemStyle}
                        renderTitle={isSelected => this._renderTitle('Program', isSelected)}
                        renderIcon={isSelected => this._renderIcon('md-notifications', isSelected)}>
                        <StackNavigation
                            id="program"
                            initialRoute={Router.getRoute('programAndroid')} />
                    </DrawerNavigationItem>

                    <DrawerNavigationItem
                        id="profile"
                        selectedStyle={styles.selectedItemStyle}
                        renderTitle={isSelected => this._renderTitle('Profile', isSelected)}
                        renderIcon={isSelected => this._renderIcon('md-contact', isSelected)}>
                        <StackNavigation
                            id="profile"
                            initialRoute={Router.getRoute('profile')}
                            />
                    </DrawerNavigationItem>

                </DrawerNavigation>
            </NavigationProvider>
        )
    }

    _renderHeader = () => {
        return (
            <LinearGradient style={styles.header} colors={['firebrick', 'red']} start={[0.0, 0.0]} end={[1.0, 1.0]}>
                <RegularText style={{ fontSize: 18, color: '#fff', backgroundColor: 'transparent' }}>
                    Quit Leaking
                </RegularText>
            </LinearGradient>
        );
    };

    _renderIcon(iconName: string, isSelected: bool): ReactElement<any> {
        let color = isSelected ? Colors.drawerIconSelected : Colors.drawerIconDefault;

        return (
            <View style={{width: 28}}>
                <Icon name={iconName} size={28} color={color} />
            </View>
        );
    };

    _renderTitle(text: string, isSelected: bool) {
        return (
            <Text style={[styles.buttonTitleText, isSelected ? styles.buttonTitleTextSelected : {}]}>
                {text}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 125,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        paddingLeft: 15,
        paddingBottom: 15,
    },
    buttonTitleText: {
        color: Colors.drawerTextDefault,
        fontWeight: 'bold',
        marginLeft: 18,
    },
    buttonTitleTextSelected: {
        color: Colors.tintColor,
    },
    selectedItemStyle: {
        backgroundColor: "#EBEBEB",
    },
})