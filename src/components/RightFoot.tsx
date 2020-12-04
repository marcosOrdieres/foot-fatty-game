import React, { useContext, useState } from 'react'
import { View, Image, Animated, Easing, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
interface RightFootProps {
    props?: any,
    onSwipeLeft: any,
    onSwipeRight: any,
    moveRightToRight: boolean,
    moveRightToLeft: boolean,
    characterChosen: string,
    rightBlackFoot: boolean,
    rightWhiteFoot: boolean,
    cakeRightFoot: boolean,
    lipRightFoot: boolean,
    onGestureEvent: any,
    layout: any
}
const { width, height } = Dimensions.get('window');

const RightFoot: React.FunctionComponent<RightFootProps> = ({ onSwipeLeft, onSwipeRight, onGestureEvent, moveRightToRight, moveRightToLeft, characterChosen, rightBlackFoot, rightWhiteFoot, cakeRightFoot, lipRightFoot, layout }) => {

    const [number, setNumber] = useState(0)
    const [primero, setPrimero] = useState(false)
    const [segundo, setSegundo] = useState(false)
    const [fast, setFast] = useState(false)

    let spinValue = new Animated.Value(0)
    Animated.timing(spinValue, { toValue: 1, duration: fast ? 120 : 200, easing: Easing.ease, useNativeDriver: true, }).start(() => {
        Animated.timing(spinValue, { toValue: 0, duration: fast ? 120 : 200, easing: Easing.quad, useNativeDriver: true, }).start()
    })
    const spin = (degrees: string) => spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', degrees] })

    const rightFootCharacter = (characterChosen: string) => {
        if (characterChosen === 'blackGirl' || characterChosen === 'blackGirlSecond' || characterChosen === 'blackGirlThird') {
            return rightBlackFoot
        } else if (characterChosen === 'cakeGirl') {
            return cakeRightFoot
        } else if (characterChosen === 'lipsGirl') {
            return lipRightFoot
        } else {
            return rightWhiteFoot
        }
    }

    const onGestureEventFunc = (event: any) => {
        if (event.nativeEvent.translationX > 40 && !primero) {
            if (event.nativeEvent.velocityX > 800) {
                setFast(true)
            } else {
                setFast(false)
            }
            setPrimero(true)
            onSwipeRight(true)
        }

        if (event.nativeEvent.translationX < -40 && !segundo) {
            if (event.nativeEvent.velocityX > 800) {
                setFast(true)
            } else {
                setFast(false)
            }
            setSegundo(true)
            onSwipeLeft(true)
        }
        if ((number > 0) !== (event.nativeEvent.translationX > 0) || (number < 0) !== (event.nativeEvent.translationX < 0)) {
            setPrimero(false)
            setSegundo(false)
        }
        setNumber(event.nativeEvent.translationX);
    }

    return (
        <View style={{ width: layout.layout.width, flex: 0.45, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 60, marginRight: 30 }}>
            <PanGestureHandler
                onGestureEvent={onGestureEventFunc}>
                <Animated.View style={{
                    marginLeft: width / 12, marginBottom: height / 6, width: width / 12, height: height / 4, zIndex: 100, transform: [
                        { rotate: moveRightToRight ? spin('45deg') : (moveRightToLeft ? spin('-45deg') : '0deg') }
                    ]
                }}>
                    <Image
                        style={{ width: width / 12, height: height / 4, resizeMode: 'stretch' }}
                        source={rightFootCharacter(characterChosen)} />
                </Animated.View>

            </PanGestureHandler>
        </View>
    )
}

RightFoot.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    onSwipeLeft: () => console.warn('pressed'),
    onSwipeRight: () => console.warn('pressed'),
    onGestureEvent: () => console.warn('pressed'),
    moveRightToRight: true,
    moveRightToLeft: true,
    characterChosen: 'true',
    rightBlackFoot: true,
    rightWhiteFoot: true,
    cakeRightFoot: true,
    lipRightFoot: true,
    layout: true
}

export default RightFoot