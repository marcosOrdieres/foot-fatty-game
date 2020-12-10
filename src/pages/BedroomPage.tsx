import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, ImageBackground, Alert, Platform } from 'react-native';
import { characterForHeadOrFeet } from '../helper-functions/utils'
import { getAsyncStorage, setAsyncStorage } from '../services/storage-service';
import * as fatImages from '../assets'
import { ButtonRounded, CustomAlert, Head, ModalShop, Sponges, Countdown, ButtonIcon, LeftFootPunch, RightFootPunch, DoubleProgressBar, Coins, TextHelper, GoldenPrices } from '../components';
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
    const [showAlertMissGame, setShowAlertMissGame] = useState(false);
    const [showAlertPassGame, setShowAlertPassGame] = useState(false);
    const [showAlertPassAndWinCoinsGame, setShowAlertPassAndWinCoinsGame] = useState(false);

    const [progressLeft, setProgressLeft] = useState(0);
    const [progressRight, setProgressRight] = useState(0);

    const [startGame, setStartGame] = useState(false);
    const [finishedGameBar, setFinishedGameBar] = useState(false);
    const [doubleScore, setDoubleScore] = useState(false);
    const [scaleFootLeft, setScaleFootLeft] = useState(2);
    const [scaleFootRight, setScaleFootRight] = useState(2);
    const [oneCharacter, setOneCharacter] = useState(false);
    const [prices, setTheGoldenPrice] = useState(null);

    const [onlineLeftGame, setOnlineLeftGame] = useState(false);
    const [onlineRightGame, setOnlineRightGame] = useState(false);

    const checkCoins = async () => {
        const coins = await getAsyncStorage('coins');
        setTotalCoins(coins)
        return coins
    }

    const onPunchFoot = (left: boolean, right: boolean, correctPunch: boolean) => {

        if (correctPunch) {
            if (left) {
                winCoinsWhenSwipe(true, false, 0.01, 1)
            }
            if (right) {
                winCoinsWhenSwipe(false, true, 0.01, 1)
            }
        } else {
            if (left) {
                winCoinsWhenSwipe(true, false, -0.01, -1)
            }
            if (right) {
                winCoinsWhenSwipe(false, true, -0.01, -1)
            }
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

    const decisionOnlineChosen = async (progressLeft: number, progressRight: number) => {
        const textArray = ['none', 'Left', 'Right'];
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        const randomString = textArray[randomNumber];

        if (progressLeft >= 1) {
            if (randomString === 'Left') {
                const coins = await getAsyncStorage('coins');
                await setAsyncStorage('coins', coins + 50);
                const coinsAfterWinOnlineGame = await getAsyncStorage('coins');
                setTotalCoins(coinsAfterWinOnlineGame)
                return { decisionSide: true, sideChosen: 'Left' }
            } else {
                return { decisionSide: false, sideChosen: 'Left' }
            }
        } else if (progressRight >= 1) {

            if (randomString === 'Right') {

                const coins = await getAsyncStorage('coins');
                await setAsyncStorage('coins', coins + 50);
                const coinsAfterWinOnlineGame = await getAsyncStorage('coins');
                setTotalCoins(coinsAfterWinOnlineGame)

                return { decisionSide: true, sideChosen: 'Right' }
            } else {
                return { decisionSide: false, sideChosen: 'Right' }
            }
        }
    }

    useEffect(() => {
        checkCoins();
        //onlineFakeGame(); why?
        getTheGoldenPrices()
        checkGames();
    }, [])

    const finishGame = async () => {
        const gamesStorage = await getAsyncStorage('games');
        if (progressLeft >= 1 || progressRight >= 1) {
            await setAsyncStorage('games', gamesStorage + 1);
            setGames(gamesStorage + 1)
            const { decisionSide, sideChosen } = await decisionOnlineChosen(progressLeft, progressRight);
            if (decisionSide) {
                setShowAlertPassAndWinCoinsGame(true)
            } else {
                setShowAlertPassGame(true)
            }
            setOnlineRightGame(false);
            setOnlineLeftGame(false);
            setStartGame(false)
            setProgressRight(0)
            setProgressLeft(0)
            setScaleFootLeft(2)
            setScaleFootRight(2)

        } else {
            setShowAlertMissGame(true)
            setOnlineRightGame(false);
            setOnlineLeftGame(false);
            setStartGame(false)
            setProgressRight(0)
            setProgressLeft(0)
            setScaleFootLeft(2)
            setScaleFootRight(2)

        }
    }

    const handleStateAlert = (newValue: boolean) => setShowAlertMissGame(newValue);
    const handleStatePassAlert = (newValue: boolean) => setShowAlertPassGame(newValue);
    const handleStatePassAndWinCoinsAlert = (newValue: boolean) => setShowAlertPassAndWinCoinsGame(newValue);

    const winCoinsWhenSwipe = async (left: boolean, right: boolean, progress: number, coinsWon: number) => {
        if (progressLeft >= 1 || progressRight >= 1) { setFinishedGameBar(true) }
        const coins = await getAsyncStorage('coins');
        if (doubleScore) {
            await setAsyncStorage('coins', coins + coinsWon * 2);
            if (left) {
                setProgressLeft(progressLeft + progress * 2)
                if (progressLeft > 0.5) {
                    onScaleFoot(0.005, 0)
                } else {
                    onScaleFoot(0.04, 0)
                }
            }
            if (right) {
                setProgressRight(progressRight + progress * 2)
                if (progressRight > 0.5) {
                    onScaleFoot(0, 0.005)
                } else {
                    onScaleFoot(0, 0.04)
                }
            }
        } else {
            await setAsyncStorage('coins', coins + coinsWon);
            if (left) {
                setProgressLeft(progressLeft + progress)
                changeHeadState()
                if (progressLeft > 0.5) {
                    onScaleFoot(0.005, 0)
                } else {
                    onScaleFoot(0.02, 0)
                }
            }
            if (right) {
                setProgressRight(progressRight + progress)
                if (progressRight > 0.5) {
                    onScaleFoot(0, 0.005)
                } else {
                    onScaleFoot(0, 0.02)
                }
            }
        }
        if (progressLeft >= 1 || progressRight >= 1) {
            finishGame()
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

    const onlineFakeGame = async (fromTime: number, toTime: number) => {
        await new Promise((resolve) => setTimeout(() => {
            setOnlineRightGame(false);
            setOnlineLeftGame(true);
            resolve();
        }, Math.floor(Math.random() * fromTime) + toTime));

        await new Promise((resolve) => setTimeout(() => {
            setOnlineLeftGame(false);
            setOnlineRightGame(true);
            resolve();
        }, Math.floor(Math.random() * fromTime) + toTime));
        onlineFakeGame(15000, 4000)
    }

    async function getTheGoldenPrices() {
        const goldenPriceStorage = await getAsyncStorage('goldenPrice');
        if (goldenPriceStorage) {
            setTheGoldenPrice(goldenPriceStorage.goldenPrice)
        }
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
                        <View style={{ left: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 20, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null }}>GAMES: {games}</Text>
                        </View>

                        <ModalShop
                            //updateCoinsCallback={updateCoinsCallback}
                            onPressCancel={() => {
                                setModalVisible(!modalVisible);
                                getTheGoldenPrices()
                                moreThanOneCharacter()
                            }}
                            itemsForPurchase={itemsForPurchase}
                            visible={modalVisible} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: 300, height: 30, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 20, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null, textAlign: 'center' }}>BEDROOM   ONLINE   PUNCHES</Text>
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
                                        onPress={() => { setFinishedGameBar(false); setStartGame(true); onlineFakeGame(2000, 100) }}
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
                            moreThanOneCharacted={oneCharacter ? false : true}
                            marginTop={'15%'}
                            textColor={oneCharacter ? 'black' : '#b3b3b3'}
                            text={'Change Character'} />
                        {!startGame ?
                            <ButtonIcon action={'Bathroom'} icon={fatImages.bathroom} place={'Bedroom'} />
                            : null
                        }
                    </View >
                    <LeftFootPunch
                        layout={layout}
                        characterChosen={characterForHeadOrFeet(characterFinal)}
                        progress={1}
                        scale={scaleFootLeft}
                        onPunch={startGame && onlineLeftGame ? () => onPunchFoot(true, false, true) : startGame ? () => onPunchFoot(true, false, false) : null}
                        leftBlackFoot={fatImages.leftBlackFoot}
                        leftWhiteFoot={(progressLeft >= 1) ? fatImages.explosion : fatImages.leftWhiteFoot}
                        cakeLeftFoot={fatImages.cakeLeftFoot}
                        lipLeftFoot={fatImages.lipLeftFoot}
                        blueLeftFoot={fatImages.blueLeftFoot}
                    />
                    <TextHelper startGame={startGame} left={'30%'} onlineGame={onlineLeftGame} text={'Left'} />
                    <TextHelper startGame={startGame} left={'60%'} onlineGame={onlineRightGame} text={'Right'} />
                    <GoldenPrices prices={prices} />

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
                        onPunch={startGame && onlineRightGame ? () => onPunchFoot(false, true, true) : startGame ? () => onPunchFoot(false, true, false) : null}
                        rightBlackFoot={fatImages.rightBlackFoot}
                        rightWhiteFoot={fatImages.rightWhiteFoot}
                        cakeRightFoot={fatImages.cakeRightFoot}
                        lipRightFoot={fatImages.lipRightFoot}
                        blueRightFoot={fatImages.blueRightFoot}
                    />

                    {showAlertMissGame ?
                        <CustomAlert
                            showAlert={showAlertMissGame}
                            onShow={handleStateAlert}
                            titleText="Sorry"
                            messageText="You   missed   the   Level!"
                            icon={fatImages.failure}
                        />
                        : null
                    }

                    {showAlertPassGame ?
                        <CustomAlert
                            showAlert={showAlertPassGame}
                            onShow={handleStatePassAlert}
                            titleText="Congratulations"
                            messageText="+  1  game!"
                            icon={fatImages.success}
                        />
                        : null
                    }

                    {showAlertPassAndWinCoinsGame ?
                        <CustomAlert
                            showAlert={showAlertPassAndWinCoinsGame}
                            onShow={handleStatePassAndWinCoinsAlert}
                            titleText="Congratulations"
                            messageText="+  1  game    +   50  coins ( side online decision )!"
                            icon={fatImages.coinImage}
                        />
                        : null
                    }
                </View>
            </View>
        </ImageBackground>
    )
}

// BedroomPage.defaultProps = {
//     name: 'Marcos First Screen'
// }

export default BedroomPage