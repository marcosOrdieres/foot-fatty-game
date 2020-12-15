import React from 'react'
import { View, Image, Text, Platform } from 'react-native';
import * as fatImages from '../assets'

interface CoinsProps {
    totalCoins?: number | undefined,
}


const Coins: React.FunctionComponent<CoinsProps> = ({ totalCoins }) => {
    return (

        <View style={{ flex: 0.2, flexDirection: 'row' }}>
            <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ height: 50, width: 50, resizeMode: 'stretch', position: 'absolute' }}
                    source={fatImages.coinImage} />
            </View>
            <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                <Text allowFontScaling style={{ fontSize: totalCoins >= 9999 ? 25 : totalCoins >= 999 ? 30 : 45, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold' }}>{totalCoins}</Text>
            </View>
        </View>
    )
}

Coins.defaultProps = {
    totalCoins: 1,
}

export default Coins