import React, {useContext} from 'react';
import {View, Image, Dimensions, PixelRatio} from 'react-native';
import {isTabletBasedOnRatio} from '../helper-functions/ratio';
interface HeadProps {
  characterChosen: string;
  blackGirl: boolean;
  blackGirlSecond: boolean;
  blackGirlThird: boolean;
  blueGirl: boolean;
  fatboyGif: boolean;
  fatboySecond: boolean;
  fatboyThird: boolean;
  cakeGirl: boolean;
  lipsGirl: boolean;
  layout: any;
}
const Head: React.FunctionComponent<HeadProps> = ({
  fatboyGif,
  fatboySecond,
  fatboyThird,
  blackGirl,
  blackGirlSecond,
  blackGirlThird,
  cakeGirl,
  lipsGirl,
  characterChosen,
  layout,
  blueGirl,
}) => {
  const headCharacter = (characterChosen: string) => {
    switch (characterChosen) {
      case 'blackGirl':
        return blackGirl;
      case 'blackGirlSecond':
        return blackGirlSecond;
      case 'blackGirlThird':
        return blackGirlThird;
      case 'cakeGirl':
        return cakeGirl;
      case 'lipsGirl':
        return lipsGirl;
      case 'fatboySecond':
        return fatboySecond;
      case 'fatboyThird':
        return fatboyThird;
      case 'blueGirl':
        return blueGirl;
      default:
        return fatboyGif;
    }
  };

  const ratio = PixelRatio.get();
  const isTablet = isTabletBasedOnRatio(ratio);
  const heightCharacter = (characterChosen: string, isTablet: boolean) => {
    switch (characterChosen) {
      case 'cakeGirl':
        if (isTablet) {
          return 170;
        } else {
          return 120;
        }
      case 'blueGirl':
        if (isTablet) {
          return 170;
        } else {
          return 120;
        }
      default:
        if (isTablet) {
          return 150;
        } else {
          return 100;
        }
    }
  };
  return (
    <View
      style={{
        width: layout.layout.width,
        flex: 0.12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: characterChosen === 'blueGirl' ? '5%' : '8%',
      }}>
      <Image
        style={{
          height: heightCharacter(characterChosen, isTablet),
          resizeMode: cakeGirl ? 'contain' : 'stretch',
        }}
        source={headCharacter(characterChosen)}
      />
    </View>
  );
};
Head.defaultProps = {
  characterChosen: 'true',
  layout: true,
  blackGirl: true,
  cakeGirl: true,
  fatboyGif: true,
  lipsGirl: true,
  fatboySecond: true,
  blueGirl: true,
};
export default Head;
