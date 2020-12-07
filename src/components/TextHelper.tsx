import React from 'react'
import { View, Text } from 'react-native';

interface TextHelperProps {
    startGame?: boolean,
    onlineGame?: boolean,
    text?: string,
    left?: string
}


const TextHelper: React.FunctionComponent<TextHelperProps> = ({ startGame, onlineGame, text, left }) => {
    return (
        <View style={{ position: 'absolute', left, top: '10%' }}>
            <Text style={{ color: '#006622', fontSize: 30, fontFamily: 'Arcade-Classic' }}>
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