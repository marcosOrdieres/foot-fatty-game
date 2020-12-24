import { PanGestureHandler } from 'react-native-gesture-handler';
import React, { useState, useRef } from 'react'
import { View, Image, Animated, Easing, Dimensions, Platform } from 'react-native';
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
    blueRightFoot: boolean,
    onGestureEvent: any,
    layout: any
}
const { width, height } = Dimensions.get('window');

const RightFootVertical: React.FunctionComponent<RightFootProps> = ({ onSwipeLeft, onSwipeRight, onGestureEvent, moveRightToRight, moveRightToLeft, characterChosen, rightBlackFoot, rightWhiteFoot, cakeRightFoot, lipRightFoot, blueRightFoot, layout }) => {

    const [number, setNumber] = useState(0)
    const [primero, setPrimero] = useState(false)
    const [segundo, setSegundo] = useState(false)
    const [fast, setFast] = useState(false)

    const ballAnimatedValueUp = useRef(new Animated.Value(0)).current;
    const ballAnimatedValueDown = useRef(new Animated.Value(0)).current;

    const moveUp = () => {
        Animated.timing(ballAnimatedValueUp, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }

    const yValUp = ballAnimatedValueUp.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 50],
    });

    const animStyleUp = {
        transform: [
            {
                translateY: yValUp,
            },
        ],
    };

    const moveDown = () => {
        Animated.timing(ballAnimatedValueDown, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }

    const yValDown = ballAnimatedValueDown.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -50],
    });

    const animStyleDown = {
        transform: [
            {
                translateY: yValDown,
            },
        ],
    };

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

    const onGestureEventFunc = (event: any) => {
        if (event.nativeEvent.translationY > 40 && !primero) {
            if (event.nativeEvent.velocityY > 800) {
                setFast(true)
            } else {
                setFast(false)
            }
            setPrimero(true)

            //hacia arriba
            moveUp()
            onSwipeRight(true)
        }

        if (event.nativeEvent.translationY < -40 && !segundo) {
            if (event.nativeEvent.velocityY > 800) {
                setFast(true)
            } else {
                setFast(false)
            }
            setSegundo(true)
            //hacia abajo
            moveDown()

            onSwipeLeft(true)
        }
        if ((number > 0) !== (event.nativeEvent.translationY > 0) || (number < 0) !== (event.nativeEvent.translationY < 0)) {
            setPrimero(false)
            setSegundo(false)
        }
        setNumber(event.nativeEvent.translationY);
    }

    return (
        <View style={{ zIndex: Platform.OS === 'ios' ? 1000 : null, width: layout.layout.width, flex: 0.45, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 60, marginRight: 30 }}>
            <PanGestureHandler
                onGestureEvent={onGestureEventFunc}>
                <Animated.View style={[moveRightToRight ? animStyleUp : animStyleDown, { marginLeft: width / 12, marginBottom: height / 6, width: width / 12, height: height / 4, zIndex: 100 }]}>
                    <Image
                        style={{ width: width / 12, height: height / 4, resizeMode: 'stretch' }}
                        source={rightFootCharacter(characterChosen)} />
                </Animated.View>

            </PanGestureHandler>
        </View>
    )
}

RightFootVertical.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    onSwipeLeft: () => console.warn('pressed'),
    onSwipeRight: () => console.warn('pressed'),
    onGestureEvent: () => console.warn('pressed'),
    moveRightToRight: true,
    moveRightToLeft: true,
    characterChosen: 'true',
    blueRightFoot: true,
    rightBlackFoot: true,
    rightWhiteFoot: true,
    cakeRightFoot: true,
    lipRightFoot: true,
    layout: true
}

export default RightFootVertical