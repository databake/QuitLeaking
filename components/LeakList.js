import React, { Component, PropTypes } from 'react';
    import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import LeakListRow from '../components/LeakListRow';

class LeakList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <View style={styles.container}>
                <LeakListRow 
                    title='Leakage' 
                    subTitle='The volume of urine in used pads'
                    volume={1000}
                    measure='ml' />
                <LeakListRow 
                    title='Fluid intake' 
                    subTitle='The volume of fluid intake over 24 hours'
                    volume={2000}
                    measure='ml' />
            </View>
        )
    }
}

LeakList.propTypes = {
    // actions: PropTypes.object.isRequired,
    // posts: PropTypes.arrayOf(PropTypes.object)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
})

export default LeakList