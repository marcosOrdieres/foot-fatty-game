import { PanGestureHandler } from 'react-native-gesture-handler';
import React, { useState, useRef } from 'react'
import { View, Image, Animated, Easing, Dimensions, Platform } from 'react-native';

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

const LeftFootVertical: React.FunctionComponent<LeftFootProps> = ({ onSwipeLeft, onSwipeRight, moveLeftToRight, moveLeftToLeft, leftBlackFoot, leftWhiteFoot, cakeLeftFoot, lipLeftFoot, characterChosen, blueLeftFoot, layout }) => {
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
        if (event.nativeEvent.translationY > 40 && !primero) {
            if (event.nativeEvent.velocityY > 800) {
                setFast(true)
            } else {
                setFast(false)
            }
            setPrimero(true)
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
        <View style={{ zIndex: Platform.OS === 'ios' ? 1000 : null, width: layout.layout.width, flex: 0.27, alignItems: 'flex-end', justifyContent: 'center', marginTop: 60 }}>
            <PanGestureHandler
                onGestureEvent={onGestureEventFunc}>
                <Animated.View style={[moveLeftToRight ? animStyleUp : animStyleDown, { marginRight: width / 12, marginBottom: height / 6, width: width / 12, height: height / 4, zIndex: 100 }]}>
                    <Image
                        style={{ width: width / 12, height: height / 4, resizeMode: 'stretch' }}
                        source={leftFootCharacter(characterChosen)} />
                </Animated.View>

            </PanGestureHandler>
        </View >
    )
}

LeftFootVertical.defaultProps = {
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

export default React.memo(LeftFootVertical)