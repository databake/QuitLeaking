import React, { Component, PropTypes } from 'react';
    import {
    StyleSheet,
    View,
} from 'react-native';

import LeakListRow from '../components/LeakListRow';
import { INPUT_TYPE, OUTPUT_TYPE } from '../app/constants/constants';

class LeakList extends Component {

    render() {
    const { outVolume, inVolume, id, date } = this.props.leakDay;

        return (
            <View style={styles.container}>
                <LeakListRow 
                    title='Leakage' 
                    subTitle='The volume of urine in used pads'
                    volume={outVolume}
                    measure='ml' 
                    type={OUTPUT_TYPE}
                    id={id}
                    date={date}
                />
                <LeakListRow 
                    title='Fluid intake' 
                    subTitle='The volume of fluid intake over 24 hours'
                    volume={inVolume}
                    measure='ml' 
                    type={INPUT_TYPE}
                    id={id}
                    date={date}
                />
            </View>
        );
    }
}

LeakList.propTypes = {
    leakDay: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default LeakList;
