import React from 'react'
import { View, Text, Platform } from 'react-native';

interface ButtonItemAndCharProps {
    opacity: boolean,
    coins: number,
    marginLeft?: string,
    bestPriceText?: string | null,
    duck?: boolean
}


const ButtonItemAndChar: React.FunctionComponent<ButtonItemAndCharProps> = ({ opacity, marginLeft, coins, bestPriceText, duck }) => {
    return (
        <View style={{ opacity: opacity ? 0.3 : null, }}>
            <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null }}>{coins ? coins + ' coins' : bestPriceText}</Text>
        </View>
    )
}


export default ButtonItemAndChar