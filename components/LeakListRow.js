import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from '@exponent/ex-navigation';
import Router from '../navigation/Router';

@withNavigation
class LeakListRow extends Component {

    onPress() {
        this.props.navigator.push(Router.getRoute(
            'volumeInput', 
            { 
                type: this.props.type,
                id: this.props.id,
                volume: this.props.volume,
            }
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={this.onPress.bind(this)} 
                    style={styles.innerContainer}
                >
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.subTitle}>{this.props.subTitle}</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.volume}>{this.props.volume}</Text>
                            <Text style={styles.measure}>{this.props.measure}</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon 
                                style={styles.chevron} 
                                color='#C8C7CC' 
                                name='angle-right' 
                                size={22} 
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

LeakListRow.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        padding: 15,
        height: 120,
    },
    innerContainer: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    left: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 16,
        color: '#BDC3C7',
    },
    volume: {
        fontSize: 20,
        color: '#5DADE2',
    },
    measure: {
        fontSize: 12,
        color: '#BDC3C7',
    },
    iconContainer: {
        width: 20, 
        justifyContent: 'center', 
        alignItems: 'flex-end',
    },
});

export default LeakListRow;
