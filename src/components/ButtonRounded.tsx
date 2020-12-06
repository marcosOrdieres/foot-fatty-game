import React from 'react'
import { Dimensions, Text, Image, View } from 'react-native';
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
                //position: 'absolute',
                //top: top,
                alignItems: 'flex-start',
                //alignItems: 'center',
                justifyContent: 'center',
            }}>
            <AwesomeButtonRick
                type={start ? "anchor" : moreThanOneCharacted ? "disabled" : "primary"}
                backgroundActive="#C0C0C0"
                borderRadius={10}
                onPress={onPress}
                width={start ? width / 4 : width / 6}
                height={height / 8.5}>
                {watchVideo ?
                    <Image
                        style={{ height: 15, width: 15, resizeMode: 'stretch' }}
                        source={watchVideoIcon} />
                    : null}
                <Text style={{ textAlign: 'center', fontSize: 20, color: textColor || 'black', fontFamily: 'Arcade-Classic' }}>{text.toUpperCase()}</Text>
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