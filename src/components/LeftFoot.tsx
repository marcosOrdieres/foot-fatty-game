import React, { useState } from 'react'
import { View, Image, Animated, Easing, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

interface LeftFootProps {
    props?: any,
    onSwipeLeft: any,
    onSwipeRight: any,
    moveLeftToRight: boolean,
    moveLeftToLeft: boolean,
    characterChosen: string,
    leftBlackFoot: boolean,
    leftWhiteFoot: boolean,
    cakeLeftFoot: boolean,
    lipLeftFoot: boolean,
    blueLeftFoot: boolean,
    layout: any
}
const { width, height } = Dimensions.get('window');

const LeftFoot: React.FunctionComponent<LeftFootProps> = ({ onSwipeLeft, onSwipeRight, moveLeftToRight, moveLeftToLeft, leftBlackFoot, leftWhiteFoot, cakeLeftFoot, lipLeftFoot, characterChosen, blueLeftFoot, layout }) => {
    const [number, setNumber] = useState(0)
    const [primero, setPrimero] = useState(false)
    const [segundo, setSegundo] = useState(false)
    const [fast, setFast] = useState(false)

    let spinValue = new Animated.Value(0)
    Animated.timing(spinValue, { toValue: 1, duration: fast ? 120 : 200, easing: Easing.ease, useNativeDriver: true, }).start(() => {
        Animated.timing(spinValue, { toValue: 0, duration: fast ? 120 : 200, easing: Easing.quad, useNativeDriver: true, }).start()
    })
    const spin = (degrees: string) => spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', degrees] })

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
        <View style={{ width: layout.layout.width, flex: 0.27, alignItems: 'flex-end', justifyContent: 'center', marginTop: 60 }}>
            <PanGestureHandler
                onGestureEvent={onGestureEventFunc}>
                <Animated.View style={{
                    marginRight: width / 12, marginBottom: height / 6, width: width / 12, height: height / 4, zIndex: 100, transform: [
                        { rotate: moveLeftToRight ? spin('45deg') : (moveLeftToLeft ? spin('-45deg') : '0deg') }
                    ]
                }}>
                    <Image
                        style={{ width: width / 12, height: height / 4, resizeMode: 'stretch' }}
                        source={leftFootCharacter(characterChosen)} />
                </Animated.View>

            </PanGestureHandler>
        </View >
    )
}

LeftFoot.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    onSwipeLeft: () => console.warn('pressed'),
    onSwipeRight: () => console.warn('pressed'),
    characterChosen: 'blackGirl',
    layout: true,
    blueLeftFoot: true,
    moveRightToRight: () => { console.log('right') },
    lipLeftFoot: true,
    moveRightToLeft: true,
    rightBlackFoot: true,
    rightWhiteFoot: true,
    cakeLeftFoot: true
}

export default React.memo(LeftFoot)