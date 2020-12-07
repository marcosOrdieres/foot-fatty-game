import React from 'react'
import { View } from 'react-native';
import AnimatedPowerBar from './AnimatedPowerBar';

interface DoubleProgressBarProps {
    progressLeft?: number,
    progressRight?: number,
}


const DoubleProgressBar: React.FunctionComponent<DoubleProgressBarProps> = ({ progressLeft, progressRight }) => {
    return (
        <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 0.49, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatedPowerBar progress={progressLeft} />
            </View>
            <View style={{ flex: 0.02 }} />
            <View style={{ flex: 0.49, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatedPowerBar progress={progressRight} />
            </View>
        </View>
    )
}

DoubleProgressBar.defaultProps = {
    progressLeft: 1,
    progressRight: 1,
}

export default DoubleProgressBar