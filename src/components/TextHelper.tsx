import React from 'react'
import { View, Text, Platform } from 'react-native';

interface TextHelperProps {
    startGame?: boolean,
    onlineGame?: boolean,
    text?: string,
    left?: string
}


const TextHelper: React.FunctionComponent<TextHelperProps> = ({ startGame, onlineGame, text, left }) => {
    return (
        <View style={{ position: 'absolute', left, top: '10%' }}>
            <Text style={{ color: '#006622', fontSize: 30, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null }}>
                {startGame && onlineGame ? text : ''}
            </Text>
        </View>
    )
}

TextHelper.defaultProps = {
    startGame: true,
    onlineGame: true,
    text: 'text'
}

export default TextHelper