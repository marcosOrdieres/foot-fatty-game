import React, { useContext } from 'react'
import { View, Image } from 'react-native';

interface HeadProps {
    characterChosen: string,
    blackGirl: boolean,
    blackGirlSecond: boolean,
    blackGirlThird: boolean,
    blueGirl: boolean,
    blueGirlSecond: boolean,
    blueGirlThird: boolean,
    fatboyGif: boolean,
    fatboySecond: boolean,
    fatboyThird: boolean,
    cakeGirl: boolean,
    lipsGirl: boolean,
    layout: any
}

const Head: React.FunctionComponent<HeadProps> = ({ fatboyGif, fatboySecond, fatboyThird, blackGirl, blackGirlSecond, blackGirlThird, cakeGirl, lipsGirl, characterChosen, layout, blueGirl, blueGirlSecond, blueGirlThird, }) => {

    const headCharacter = (characterChosen: string) => {
        switch (characterChosen) {
            case 'blackGirl':
                return blackGirl
            case 'blackGirlSecond':
                return blackGirlSecond
            case 'blackGirlThird':
                return blackGirlThird
            case 'cakeGirl':
                return cakeGirl
            case 'lipsGirl':
                return lipsGirl
            case 'fatboySecond':
                return fatboySecond
            case 'fatboyThird':
                return fatboyThird
            case 'blueGirl':
                return blueGirl
            case 'blueGirlSecond':
                return blueGirlSecond
            case 'blueGirlThird':
                return blueGirlThird

            default:
                return fatboyGif
        }
    }
    return (
        <View style={{
            width: layout.layout.width,
            flex: 0.12, alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: characterChosen === 'blueGirl' || characterChosen === 'blueGirlSecond' || characterChosen === 'blueGirlThird' ? '5%' : '8%',
        }}>
            <Image
                style={{
                    height: characterChosen === 'cakeGirl' || characterChosen === 'blueGirl' || characterChosen === 'blueGirlSecond' || characterChosen === 'blueGirlThird' ? 120 : 100,
                    width: cakeGirl ? 200 : 30,
                    resizeMode: cakeGirl ? 'contain' : 'stretch'
                }}
                source={headCharacter(characterChosen)} />
        </View>
    )
}

Head.defaultProps = {
    characterChosen: 'true',
    layout: true,
    blackGirl: true,
    cakeGirl: true,
    fatboyGif: true,
    lipsGirl: true,
    fatboySecond: true,
    blueGirl: true,
    blueGirlSecond: true,
    blueGirlThird: true,
}

export default Head