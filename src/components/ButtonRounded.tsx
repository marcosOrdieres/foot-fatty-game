import React from 'react'
import { Dimensions, Text, Image, View, Platform } from 'react-native';
import { watchVideoIcon } from '../assets';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
const { width, height } = Dimensions.get('window');

interface ButtonRoundedProps {
    onPress: any,
    text: string,
    marginTop?: string,
    textColor?: string,
    start?: boolean,
    watchVideo: boolean,
    moreThanOneCharacted?: boolean
}


const ButtonRounded: React.FunctionComponent<ButtonRoundedProps> = ({ onPress, text, marginTop, textColor, start, watchVideo, moreThanOneCharacted }) => {
    return (
        <View
            style={{
                marginTop,
                alignItems: 'flex-start',
                justifyContent: 'center',
                zIndex: Platform.OS === 'ios' ? 1000 : null
            }}>
            <AwesomeButtonRick
                type={start ? "anchor" : moreThanOneCharacted ? "disabled" : "primary"}
                backgroundActive="#C0C0C0"
                borderRadius={10}
                onPress={onPress}
                width={start ? width / 4 : width / 6}
                height={height / 8.5}>
                <Text adjustsFontSizeToFit style={{ textAlign: 'center', fontSize: Platform.OS === 'ios' ? 14 : 20, color: textColor || 'black', fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold' }}>{text.toUpperCase()}</Text>
            </AwesomeButtonRick>
        </View>

    )
}

ButtonRounded.defaultProps = {
    onPress: () => console.warn('pressed'),
    text: 'string',
    top: 80
}

export default ButtonRounded