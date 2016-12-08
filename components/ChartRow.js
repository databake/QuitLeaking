import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

class ChartRow extends Component {

    static propTyps = {
        day: PropTypes.string,
        date: PropTypes.string,
        topValue: PropTypes.number.isRequired,
        topTitle: PropTypes.string,
        bottomValue: PropTypes.number.isRequired,
        bottomTitle: PropTypes.string,
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.props.day}</Text>
                    <Text style={styles.title}>{this.props.date}</Text>
                </View>
                <View style={styles.bar}>
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <View 
                            style={{ 
                                flex: this.props.topValue, 
                                backgroundColor: '#3ea2ee', 
                                margin: 1 
                            }} 
                        />
                        <Text style={[styles.topBarText, { flex: 12 - this.props.topValue }]}>
                            {this.props.topTitle}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <View 
                            style={{ 
                                flex: this.props.bottomValue, 
                                backgroundColor: '#9dcef6', 
                                margin: 1 
                            }} 
                        />
                        <Text style={[styles.bottomBarText, { flex: 12 - this.props.bottomValue }]}>
                            {this.props.bottomTitle}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
    },
    title: {
        fontSize: 12,
        color: 'gray',
        marginRight: 20,
    },
    bar: {
        flex: 1,
    },
    topBarText: {
        fontSize: 11,
        fontWeight: '400',
        color: '#3ea2ee',
        marginLeft: 5,
    },
    bottomBarText: {
        fontSize: 11,
        fontWeight: '400',
        color: '#9dcef6',
        marginLeft: 5,        
    },
});

export default ChartRow;
