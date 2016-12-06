import React, { Component, PropTypes } from 'react';
    import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

import Colors from '../constants/Colors';

class TodayButton extends Component {

   static propTypes = {
       tintColor: PropTypes.string.isRequired,
       onButtonPress: PropTypes.func.isRequired,
       title: PropTypes.string,
   }

   static defaultProps = {
       title: 'Today',
   }

    render() {
        return(
            <View style={styles.container}>
                <Button color={this.props.tintColor} 
                    title={this.props.title} 
                    onPress={this.props.onButtonPress} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10,
    },
})

export default TodayButton