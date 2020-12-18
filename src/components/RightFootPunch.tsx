import React from 'react'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
interface RightFootPunchProps {
    props?: any,
    characterChosen: string,
    rightBlackFoot: boolean,
    rightWhiteFoot: boolean,
    cakeRightFoot: boolean,
    lipRightFoot: boolean,
    blueRightFoot: boolean,
    onPunch: any,
    progress: number,
    scale: number,
    layout: any
}
const { width, height } = Dimensions.get('window');

const RightFootPunch: React.FunctionComponent<RightFootPunchProps> = ({ onPunch, progress, scale, characterChosen, rightBlackFoot, rightWhiteFoot, cakeRightFoot, lipRightFoot, blueRightFoot, layout }) => {
    const rightFootCharacter = (characterChosen: string) => {
        if (characterChosen === 'blackGirl' || characterChosen === 'blackGirlSecond' || characterChosen === 'blackGirlThird') {
            return rightBlackFoot
        } else if (characterChosen === 'cakeGirl') {
            return cakeRightFoot
        } else if (characterChosen === 'lipsGirl') {
            return lipRightFoot
        } else if (characterChosen === 'blueGirl' || characterChosen === 'blueGirlSecond' || characterChosen === 'blueGirlThird') {
            return blueRightFoot
        } else {
            return rightWhiteFoot
        }
    }

    return (
        <View style={{ zIndex: 1000, width: layout.layout.width, flex: 0.45, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 60, marginRight: 30 }}>
            <TouchableOpacity onPress={onPunch}>
                <Image
                    style={{ marginBottom: '30%', marginLeft: '40%', width: (width / 12) / scale, height: (height / 4) / scale, resizeMode: 'stretch' }}
                    source={rightFootCharacter(characterChosen)} />
            </TouchableOpacity>
        </View>
    )
}

RightFootPunch.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    onPunch: () => { console.log('Punched') },
    progress: 1,
    characterChosen: 'true',
    blueRightFoot: true,
    rightBlackFoot: true,
    rightWhiteFoot: true,
    cakeRightFoot: true,
    lipRightFoot: true,
    layout: true
}

export default RightFootPunch