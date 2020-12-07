import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, ImageBackground, Alert, Platform } from 'react-native';
import { characterForHeadOrFeet, multipleFive } from '../helper-functions/utils'
import { getAsyncStorage, setAsyncStorage } from '../services/storage-service';
import * as fatImages from '../assets'
import { AnimatedPowerBar, ButtonRounded, RightFoot, LeftFoot, Head, Ducks, ModalShop, Sponges, Countdown, ButtonIcon, LeftFootPunch, RightFootPunch, DoubleProgressBar, Coins, TextHelper } from '../components';
//import { ChangeHeadArray } from '../helper-functions/changeHead'
const { width, height } = Dimensions.get('window');

//asyncStorage keys: character, coins, duck, games, duster

const BedroomPage = () => {
    const [layout] = useState({ layout: { height, width } });
    const [onFire, setOnFire] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemsForPurchase, setItemsForPurchase] = useState(null);
    const [totalCoins, setTotalCoins] = useState(0);
    const [games, setGames] = useState(0);
    const [progress, setProgress] = useState(0);
    const [characterFinal, setCharacterFinal] = useState('fatBoy');

    const [progressLeft, setProgressLeft] = useState(0);
    const [progressRight, setProgressRight] = useState(0);

    const [startGame, setStartGame] = useState(false);
    const [finishedGameBar, setFinishedGameBar] = useState(false);
    const [doubleScore, setDoubleScore] = useState(false);
    const [scaleFootLeft, setScaleFootLeft] = useState(2);
    const [scaleFootRight, setScaleFootRight] = useState(2);
    const [oneCharacter, setOneCharacter] = useState(false);

    const [onlineLeftGame, setOnlineLeftGame] = useState(false);
    const [onlineRightGame, setOnlineRightGame] = useState(false);

    const checkCoins = async () => {
        const coins = await getAsyncStorage('coins');
        setTotalCoins(coins)
        return coins
    }

    const onPunchFoot = (left: boolean, right: boolean) => {
        if (left) {
            winCoinsWhenSwipe(true, false)
            return console.warn('pressed left')
        }
        if (right) {
            winCoinsWhenSwipe(false, true)
            return console.warn('pressed right')
        }
    }

    const checkGames = async () => {
        const gamesStorage = await getAsyncStorage('games');
        if (!gamesStorage) {
            await setAsyncStorage('games', 0)
            return setGames(0)
        }
        setGames(gamesStorage)
    }

    useEffect(() => {
        checkCoins();
        onlineFakeGame();
        checkGames();
    }, [])

    const finishGame = async () => {
        const gamesStorage = await getAsyncStorage('games');
        if (progressLeft >= 1 || progressRight >= 1) {
            await setAsyncStorage('games', gamesStorage + 1);
            setGames(gamesStorage + 1)
            Alert.alert('CONGRATULATIONS, you passed the level 😀 😀')
            setStartGame(false)
            setProgressRight(0)
            setProgressLeft(0)
            setScaleFootLeft(2)
            setScaleFootRight(2)
            setOnlineRightGame(false);
            setOnlineLeftGame(false);
        } else {
            Alert.alert('Sorry, You missed the Level 😅 😅')
            setStartGame(false)
            setProgressRight(0)
            setProgressLeft(0)
            setScaleFootLeft(2)
            setScaleFootRight(2)
            setOnlineRightGame(false);
            setOnlineLeftGame(false);
        }
    }

    const winCoinsWhenSwipe = async (left: boolean, right: boolean) => {
        if (progressLeft >= 1 || progressRight >= 1) { setFinishedGameBar(true) }
        const coins = await getAsyncStorage('coins');
        if (doubleScore) {
            await setAsyncStorage('coins', coins + 2);
            if (left) {
                setProgressLeft(progressLeft + 0.02)
                onScaleFoot(0.04, 0)
            }
            if (right) {
                setProgressRight(progressRight + 0.02)
                onScaleFoot(0, 0.04)
            }
        } else {
            await setAsyncStorage('coins', coins + 1000);
            if (left) {
                setProgressLeft(progressLeft + 0.1)
                changeHeadState()
                onScaleFoot(0.02, 0)
            }
            if (right) {
                setProgressRight(progressRight + 0.01)
                onScaleFoot(0, 0.02)
            }
        }
        const coinsAfterSwipe = await getAsyncStorage('coins');
        setTotalCoins(coinsAfterSwipe)
    }

    const onScaleFoot = (left: number, right: number) => {
        if (left !== 0) {
            setScaleFootLeft(scaleFootLeft - left)
        }
        if (right !== 0) {
            setScaleFootRight(scaleFootRight - right)
        }
    }

    async function changeCharacter() {
        const characterListStorage = await getAsyncStorage('character');
        const characterListStorageNumber = characterListStorage.character.length;
        const numberIWant = Math.floor(Math.random() * characterListStorageNumber) + 0;
        const finalChar = characterListStorage.character[numberIWant];
        setCharacterFinal(finalChar);
    }

    async function moreThanOneCharacter() {
        const characterListStorage = await getAsyncStorage('character');
        if (characterListStorage.character.length !== 1) {
            setOneCharacter(true)
        } else {
            setOneCharacter(false)
        }
    }

    const changeHeadState = () => {
        switch (characterFinal) {
            case 'fatBoy':
                setCharacterFinal('fatboySecond')
                break;
            case 'fatboySecond':
                setCharacterFinal('fatboyThird')
                break;
            case 'fatboyThird':
                setCharacterFinal('fatBoy')
                break;
            case 'blackGirl':
                setCharacterFinal('blackGirlSecond')
                break;
            case 'blackGirlSecond':
                setCharacterFinal('blackGirlThird')
                break;
            case 'blackGirlThird':
                setCharacterFinal('blackGirl')
                break;
            case 'blueGirl':
                setCharacterFinal('blueGirlSecond')
                break;
            case 'blueGirlSecond':
                setCharacterFinal('blueGirlThird')
                break;
            case 'blueGirlThird':
                setCharacterFinal('blueGirl')
                break;
        }
    }

    const onlineFakeGame = async () => {
        await new Promise((resolve) => setTimeout(() => {
            setOnlineRightGame(false);
            setOnlineLeftGame(true);
            resolve();
        }, Math.floor(Math.random() * 12000) + 100));

        await new Promise((resolve) => setTimeout(() => {
            setOnlineLeftGame(false);
            setOnlineRightGame(true);
            resolve();
        }, Math.floor(Math.random() * 12000) + 100));
        onlineFakeGame()
    }

    return (
        <ImageBackground
            source={onFire ? fatImages.imageBedroomBig : fatImages.imageBedroomBig}
            style={{ flex: 1 }}>
            <View style={{ height: layout.layout.height, width: layout.layout.width, margin: 5, marginLeft: '3.5%' }}>
                <View style={{ width: layout.layout.width, flex: 0.2, flexDirection: 'row' }}>
                    <Coins totalCoins={totalCoins} />
                    <DoubleProgressBar progressLeft={progressLeft} leftChosen={startGame ? onlineLeftGame : null} rightChosen={startGame ? onlineRightGame : null} progressRight={progressRight} />
                    <TouchableOpacity
                        onPress={() => { setModalVisible(true) }}
                        style={{ flex: 0.15 }}>
                        <Image
                            style={{ height: 80, width: 80, resizeMode: 'stretch', justifyContent: 'center', alignItems: 'center', marginLeft: 30 }}
                            source={fatImages.shopIcon} />
                        <View style={{ top: 5, left: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 25, fontFamily: 'Arcade-Classic' }}>GAMES: {games}</Text>
                        </View>

                        <ModalShop
                            //updateCoinsCallback={updateCoinsCallback}
                            onPressCancel={() => {
                                setModalVisible(!modalVisible);
                                moreThanOneCharacter()
                            }}
                            itemsForPurchase={itemsForPurchase}
                            visible={modalVisible} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: 300, height: 20, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 25, fontFamily: 'Arcade-Classic', textAlign: 'center' }}>BEDROOM   ONLINE   PUNCHES</Text>
                </View>
                <View style={{ width: layout.layout.width, flex: 0.8, flexDirection: 'row' }}>
                    <View style={{ width: '25%', height: '100%' }}>
                        <View>
                            {startGame ?
                                <View style={{ marginRight: '30%' }}>
                                    <Countdown
                                        finishedGameBar={finishedGameBar}
                                        onFire={onFire}
                                        onFinish={() => finishGame()}
                                        secondsGame={50}
                                        secondsGameOnFire={40}
                                    />
                                </View >
                                :
                                <View>
                                    <ButtonRounded
                                        onPress={() => { setFinishedGameBar(false); setStartGame(true); onlineFakeGame() }}
                                        start
                                        textColor={'white'}
                                        text={'Start Game'} />
                                </View>
                            }
                        </View>

                        <ButtonRounded
                            //onPress={() => {doubleScoreFunction()}}
                            marginTop={'15%'}
                            watchVideo
                            text={'X2 - Watch Video'} />
                        <ButtonRounded
                            onPress={() => changeCharacter()}
                            moreThanOneCharacted={false}
                            marginTop={'10%'}
                            textColor={'black'}
                            text={'Change Character'} />
                        <ButtonIcon action={'Bathroom'} icon={fatImages.bathroom} />
                        <Text style={{ marginRight: '35%', fontSize: 14, fontFamily: 'Arcade-Classic', textAlign: 'center' }}>Bathroom</Text>
                    </View >
                    <LeftFootPunch
                        layout={layout}
                        characterChosen={characterForHeadOrFeet(characterFinal)}
                        progress={1}
                        scale={scaleFootLeft}
                        onPunch={startGame && onlineLeftGame ? () => onPunchFoot(true, false) : null}
                        leftBlackFoot={fatImages.leftBlackFoot}
                        leftWhiteFoot={(progressLeft >= 1) ? fatImages.explosion : fatImages.leftWhiteFoot}
                        cakeLeftFoot={fatImages.cakeLeftFoot}
                        lipLeftFoot={fatImages.lipLeftFoot}
                        blueLeftFoot={fatImages.blueLeftFoot}
                    />
                    <TextHelper startGame={startGame} left={'30%'} onlineGame={onlineLeftGame} text={'Left'} />
                    <TextHelper startGame={startGame} left={'60%'} onlineGame={onlineRightGame} text={'Right'} />


                    <Head
                        layout={layout}
                        characterChosen={characterForHeadOrFeet(characterFinal)}
                        lipsGirl={fatImages.lipsGirl}
                        fatboyGif={fatImages.fatboyGif}
                        fatboySecond={fatImages.fatboySecond}
                        fatboyThird={fatImages.fatboyThird}
                        cakeGirl={fatImages.cakeGirl}
                        blackGirlSecond={fatImages.blackGirlSecond}
                        blackGirlThird={fatImages.blackGirlThird}
                        blackGirl={fatImages.blackGirl}
                        blueGirlSecond={fatImages.blueGirlSecond}
                        blueGirlThird={fatImages.blueGirlThird}
                        blueGirl={fatImages.blueGirl} />

                    <RightFootPunch
                        layout={layout}
                        characterChosen={characterForHeadOrFeet(characterFinal)}
                        progress={1}
                        scale={scaleFootRight}
                        onPunch={startGame && onlineRightGame ? () => onPunchFoot(false, true) : null}
                        rightBlackFoot={fatImages.rightBlackFoot}
                        rightWhiteFoot={fatImages.rightWhiteFoot}
                        cakeRightFoot={fatImages.cakeRightFoot}
                        lipRightFoot={fatImages.lipRightFoot}
                        blueRightFoot={fatImages.blueRightFoot}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

// BedroomPage.defaultProps = {
//     name: 'Marcos First Screen'
// }

export default BedroomPage