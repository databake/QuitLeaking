
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class TabIcon extends Component {

    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        selected: PropTypes.bool,
        title: PropTypes.string,
        iconName: PropTypes.string,
    }

    static defaultProps = {
        iconName: 'egg',
    };

    render() {
        let color = this.props.selected ? 'red' : 'gray'
        var iconName
        if (Platform.OS === 'ios') {
            iconName = this.props.selected ? "ios-" + this.props.iconName : "ios-" + this.props.iconName + "-outline"
        } else {
            iconName = 'md-' + this.props.iconName
        }
         
        
        return (
            <View style={styles.container}>
                <Icon color={color} name={iconName} size={28} />
                <Text style={[styles.tabBarTitle, { color: color }]}>{this.props.title}</Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarTitle: {
        fontSize: 12,
        fontWeight: "200",
    }
})

export default TabIcon