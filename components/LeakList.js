import React, { Component, PropTypes } from 'react';
    import {
    StyleSheet,
    View,
} from 'react-native';

import LeakListRow from '../components/LeakListRow';

class LeakList extends Component {

    static propTypes = {
        onPress: PropTypes.func.isRequired,
    }

    render() {
        return (
            <View style={styles.container}>
                <LeakListRow 
                    title='Leakage' 
                    subTitle='The volume of urine in used pads'
                    volume={1000}
                    measure='ml' 
                    onRowPress={this.props.onPress}
                />
                <LeakListRow 
                    title='Fluid intake' 
                    subTitle='The volume of fluid intake over 24 hours'
                    volume={2000}
                    measure='ml' 
                    onRowPress={this.props.onPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default LeakList;
