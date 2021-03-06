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
import LargeRadioButton from './LargeRadioButton';
import Router from '../navigation/Router';
import { LONG_SQUEEZE_BUTTON, SHORT_SQUEEZE_BUTTON } from '../app/constants/constants';


@withNavigation
export default class CareListRow extends Component {

    constructor(props) {
        super(props);
        this.onRowPress = this.onRowPress.bind(this);
    }

    onRowPress() {
        this.props.navigator.push(
            Router.getRoute('now')
        );
    }

    render() {
        return (
            <View style={[styles.container, { height: 100 }]}>
                    <View style={styles.innerContainer}>
                        <View style={styles.title}>
                            <Text
                                style={[styles.text, { fontWeight: 'bold' }]}
                            >{this.props.title}
                                <Text style={styles.text}> {this.props.subTitle}</Text>
                            </Text>
                        </View>
                        <View style={styles.circles}>
                            <LargeRadioButton 
                                complete={this.props.slowComplete} 
                                color={this.props.color} 
                                sessionIndex={this.props.sessionIndex}
                                squeezeIndex={LONG_SQUEEZE_BUTTON}
                                onButtonPress={this.props.onPress}
                            />
                            <LargeRadioButton 
                                complete={this.props.quickComplete} 
                                color={this.props.color} 
                                sessionIndex={this.props.sessionIndex}
                                squeezeIndex={SHORT_SQUEEZE_BUTTON}
                                onButtonPress={this.props.onPress}
                            />
                            <TouchableOpacity 
                                onPress={this.onRowPress} 
                                style={styles.iconContainer}
                            >
                                <View style={styles.iconContainer}>
                                    <Icon 
                                        style={styles.chevron} 
                                        color='#C8C7CC' 
                                        name='angle-right' 
                                        size={22} 
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
        );
    }
}

CareListRow.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    sessionIndex: PropTypes.number.isRequired,
};

CareListRow.defaultProps = {
    color: 'red',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        padding: 8,
    },
    innerContainer: {
        flex: 1,
    },
    title: {
        flex: 1,
        backgroundColor: 'white',
    },
    circles: {
        flex: 3,
        flexDirection: 'row',
    },
    text: {
        fontSize: 15,
        fontWeight: '200',
    },
    iconContainer: {
        flex: 1, 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        marginBottom: 16,
    },
});
