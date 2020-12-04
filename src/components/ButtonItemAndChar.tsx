import React from 'react'
import { View, Text } from 'react-native';

interface ButtonItemAndCharProps {
    opacity: boolean,
    coins: number,
    marginLeft?: string
}


const ButtonItemAndChar: React.FunctionComponent<ButtonItemAndCharProps> = ({ opacity, marginLeft, coins }) => {
    return (
        <View style={{ opacity: opacity ? 0.3 : null, position: 'absolute', alignItems: 'center', marginLeft: marginLeft || null }}>
            <Text style={{ textAlign: 'center', marginTop: 150, fontSize: 15, fontFamily: 'Arcade-Classic' }}>{coins} coins</Text>
        </View>
    )
}

ButtonItemAndChar.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
}

export default ButtonItemAndChar