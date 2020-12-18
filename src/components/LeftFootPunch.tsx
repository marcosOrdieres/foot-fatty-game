import React from 'react'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';

interface LeftFootPunchProps {
    props?: any,
    onPunch: any,
    progress: any,
    characterChosen: string,
    leftBlackFoot: boolean,
    leftWhiteFoot: boolean,
    cakeLeftFoot: boolean,
    lipLeftFoot: boolean,
    blueLeftFoot: boolean,
    scale: number,
    layout: any
}
const { width, height } = Dimensions.get('window');

const LeftFootPunch: React.FunctionComponent<LeftFootPunchProps> = ({ onPunch, progress, scale, leftBlackFoot, leftWhiteFoot, cakeLeftFoot, lipLeftFoot, characterChosen, blueLeftFoot, layout }) => {
    const leftFootCharacter = (characterChosen: string) => {
        if (characterChosen === 'blackGirl' || characterChosen === 'blackGirlSecond' || characterChosen === 'blackGirlThird') {
            return leftBlackFoot
        } else if (characterChosen === 'cakeGirl') {
            return cakeLeftFoot
        } else if (characterChosen === 'lipsGirl') {
            return lipLeftFoot
        } else if (characterChosen === 'blueGirl' || characterChosen === 'blueGirlSecond' || characterChosen === 'blueGirlThird') {
            return blueLeftFoot
        }
        else {
            return leftWhiteFoot
        }
    }

    return (
        <View style={{ zIndex: 1000, width: layout.layout.width, flex: 0.27, alignItems: 'flex-end', justifyContent: 'center', marginTop: 60 }}>
            <TouchableOpacity onPress={onPunch}>
                <Image
                    style={{ marginBottom: '30%', marginRight: '50%', width: (width / 12) / scale, height: (height / 4) / scale, resizeMode: 'stretch' }}
                    source={leftFootCharacter(characterChosen)} />
            </TouchableOpacity>

        </View >
    )
}

LeftFootPunch.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    onPunch: () => console.warn('pressed'),
    progress: 1,
    characterChosen: 'blackGirl',
    layout: true,
    blueLeftFoot: true,
    lipLeftFoot: true,
    rightBlackFoot: true,
    rightWhiteFoot: true,
    cakeLeftFoot: true
}

export default LeftFootPunch