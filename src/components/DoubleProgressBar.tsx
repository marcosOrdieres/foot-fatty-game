import React from 'react'
import { View } from 'react-native';
import AnimatedPowerBar from './AnimatedPowerBar';

interface DoubleProgressBarProps {
    progressLeft?: number,
    progressRight?: number,
    leftChosen?: boolean | null,
    rightChosen?: boolean | null,
}


const DoubleProgressBar: React.FunctionComponent<DoubleProgressBarProps> = ({ progressLeft, progressRight, leftChosen, rightChosen }) => {
    return (
        <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
                flex: 0.49,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: leftChosen ? 1 : 0.5,
                borderWidth: leftChosen ? 4 : null,
                borderColor: leftChosen ? '#006622' : null
            }}>
                <AnimatedPowerBar progress={progressLeft} />
            </View>
            <View style={{ flex: 0.02 }} />
            <View style={{
                flex: 0.49,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: rightChosen ? 1 : 0.5,
                borderWidth: rightChosen ? 4 : null,
                borderColor: rightChosen ? '#006622' : null
            }}>
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