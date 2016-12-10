import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    StackNavigation,
    DrawerNavigation,
    DrawerNavigationItem,
} from '@exponent/ex-navigation';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import Router from './Router';
import { RegularText } from '../components/StyledText';

export default class TabNavigationLayout extends Component {

    renderHeader = () => (
        <LinearGradient
            style={styles.header}
            colors={['firebrick', 'red']}
            start={[0.0, 0.0]}
            end={[1.0, 1.0]}
        >
            <RegularText style={styles.regularText}>
                Quit Leaking
                </RegularText>
        </LinearGradient>
    );

    renderIcon(iconName: string, isSelected: bool) {
        const color = isSelected ? Colors.drawerIconSelected : Colors.drawerIconDefault;

        return (
            <View style={{ width: 28 }}>
                <Icon name={iconName} size={28} color={color} />
            </View>
        );
    }

    renderTitle(text: string, isSelected: bool) {
        return (
            <Text
                style={[styles.buttonTitleText, isSelected ?
                    styles.buttonTitleTextSelected : {}]}
            >
                {text}
            </Text>
        );
    }

    render() {
        return (
            <DrawerNavigation
                id="main"
                navigatorUID="main"
                drawerWidth={300}
                renderHeader={this.renderHeader}
                initialItem="squeeze"
            >
                <DrawerNavigationItem
                    id="squeeze"
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('Squeeze', isSelected)}
                    renderIcon={isSelected => this.renderIcon('md-heart', isSelected)}
                >
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
                    renderTitle={isSelected => this.renderTitle('Leakage', isSelected)}
                    renderIcon={isSelected => this.renderIcon('md-flask', isSelected)}
                >
                    <StackNavigation
                        id="leakage"
                        initialRoute={Router.getRoute('leakage')}
                    />
                </DrawerNavigationItem>

                <DrawerNavigationItem
                    id="insights"
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('Insights', isSelected)}
                    renderIcon={isSelected => this.renderIcon('md-stats', isSelected)}
                >
                    <StackNavigation
                        id="insights"
                        initialRoute={Router.getRoute('insights')}
                    />
                </DrawerNavigationItem>

                <DrawerNavigationItem
                    id="program"
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('Program', isSelected)}
                    renderIcon={isSelected => this.renderIcon('md-notifications', isSelected)}
                >
                    <StackNavigation
                        id="program"
                        initialRoute={Router.getRoute('programAndroid')}
                    />
                </DrawerNavigationItem>

                <DrawerNavigationItem
                    id="profile"
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('Profile', isSelected)}
                    renderIcon={isSelected => this.renderIcon('md-contact', isSelected)}
                >
                    <StackNavigation
                        id="profile"
                        initialRoute={Router.getRoute('profile')}
                    />
                </DrawerNavigationItem>

            </DrawerNavigation>
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
        backgroundColor: '#EBEBEB',
    },
    regularText: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: 'transparent',
    },
});
