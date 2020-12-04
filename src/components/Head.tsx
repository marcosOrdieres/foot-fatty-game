import React, { useContext } from 'react'
import { View, Image } from 'react-native';

interface HeadProps {
    characterChosen: string,
    blackGirl: boolean,
    blackGirlSecond: boolean,
    blackGirlThird: boolean,
    fatboyGif: boolean,
    fatboySecond: boolean,
    fatboyThird: boolean,
    cakeGirl: boolean,
    lipsGirl: boolean,
    layout: any
}

const Head: React.FunctionComponent<HeadProps> = ({ fatboyGif, fatboySecond, fatboyThird, blackGirl, blackGirlSecond, blackGirlThird, cakeGirl, lipsGirl, characterChosen, layout }) => {

    const headCharacter = (characterChosen: string) => {
        console.log('EL CHOSEN', characterChosen)
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
            default:
                return fatboyGif
        }
    }
    return (
        <View style={{
            width: layout.layout.width,
            flex: 0.12, alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: cakeGirl ? '8%' : '12%',
            marginBottom: 10
        }}>
            <Image
                style={{
                    height: 100,
                    width: cakeGirl ? 150 : 30,
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
    fatboySecond: true
}

export default Head