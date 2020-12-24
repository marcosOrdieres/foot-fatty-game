import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, ImageBackground, Platform } from 'react-native';
import { characterForHeadOrFeet, multipleFive } from '../helper-functions/utils'
import { getAsyncStorage, setAsyncStorage } from '../services/storage-service';
import * as fatImages from '../assets'
import { LeftFootVertical, RightFootVertical, AnimatedPowerBar, ButtonRounded, RightFoot, LeftFoot, Head, Ducks, ModalShop, Sponges, Countdown, ButtonIcon, Coins, TextHelper, CustomAlert } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdMobInterstitial } from 'react-native-admob';
import * as InAppPurchases from 'expo-in-app-purchases';
const { width, height } = Dimensions.get('window');

//asyncStorage keys: character, coins, duck, games, goldenPrices

const LivingroomPage = () => {
    const insets = useSafeAreaInsets();
    const [totalCoins, setTotalCoins] = useState(0);
    const [games, setGames] = useState(0);

    const [moveLeftToLeft, setMoveLeftToLeft] = useState(false);
    const [moveLeftToRight, setMoveLeftToRight] = useState(false);
    const [moveRightToLeft, setMoveRightToLeft] = useState(false);
    const [moveRightToRight, setMoveRightToRight] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [characterFinal, setCharacterFinal] = useState('fatBoy');
    const [showAlertMissGame, setShowAlertMissGame] = useState(false);
    const [showAlertPassGame, setShowAlertPassGame] = useState(false);
    const [showAlertPassAndWinCoinsGame, setShowAlertPassAndWinCoinsGame] = useState(false);
    const [showAlertInformation, setShowAlertInformation] = useState(false);

    const [progress, setProgress] = useState(0);
    const [doubleScore, setDoubleScore] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [theDucks, setTheDucks] = useState(null);
    const [onFire, setOnFire] = useState(false);
    const [multiplosCincoMasUno, setMultiplosCincoMasUno] = useState(false);
    const [finishedGameBar, setFinishedGameBar] = useState(false);
    const [leftGame, setLeftGame] = useState(false);
    const [rightGame, setRightGame] = useState(false);
    const [oneCharacter, setOneCharacter] = useState(false);
    const [correlacionTresForGame, setCorrelacionTresForGame] = useState(false);
    const [itemsForPurchase, setItemsForPurchase] = useState(null);
    const [layout] = useState({ layout: { height, width } });
    const sponges = [fatImages.spongeNormal, fatImages.spongeNormal, fatImages.spongeNormal, fatImages.spongeOrange, fatImages.spongeFire]


    const onSwipeLeftFootToLeft = () => {
        setTheProferFootMove(true, false, false, false)
        winCoinsWhenSwipe()
    }
    const onSwipeLeftFootToRight = () => {
        setTheProferFootMove(false, true, false, false)
        winCoinsWhenSwipe()
    }
    const onSwipeRightFootToLeft = () => {

        setTheProferFootMove(false, false, true, false)
        winCoinsWhenSwipe()
    }
    const onSwipeRightFootToRight = () => {
        changeHeadState()
        setTheProferFootMove(false, false, false, true)
        winCoinsWhenSwipe()
    }

    const setTheProferFootMove = (first: boolean, second: boolean, third: boolean, fourth: boolean) => {
        setMoveLeftToLeft(first)
        setMoveLeftToRight(second)
        setMoveRightToLeft(third)
        setMoveRightToRight(fourth)
    }

    const footExtraCoins = Platform.select({
        ios: ['1'],
        android: ['footcoins'],
    });

    const chargeInAppPurchases = async () => {
        await InAppPurchases.connectAsync();
        const { responseCode, results } = await InAppPurchases.getProductsAsync(footExtraCoins);
        console.warn('responseCode', responseCode)
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
            console.warn('results getProductsAsync', results)
            setItemsForPurchase(results);
        }
        // Set purchase listener
        setListenerForPurchaseFunction();
    }


    const setListenerForPurchaseFunction = async () => {
        console.warn('entro en setListenerForPurchaseFunction, but only goes though if item purchased')
        await InAppPurchases.setPurchaseListener(async ({ responseCode, results, errorCode }) => {

            // Purchase was successful
            if (responseCode === InAppPurchases.IAPResponseCode.OK) {
                results.forEach(purchase => {
                    if (!purchase.acknowledged) {
                        console.warn(`Successfully purchased ${purchase.productId}`);
                        // Process transaction here and unlock content...
                        // Then when you're done
                        InAppPurchases.finishTransactionAsync(purchase, true);
                        setSuccessAsync();
                    }
                });
            } else if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
                console.warn('User canceled the transaction');
            } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
                console.warn('User does not have permissions to buy but requested parental approval (iOS only)');
            } else {
                console.warn(`Something went wrong with the purchase. Received errorCode ${errorCode}`);
            }
        });
    }

    const setSuccessAsync = async () => {
        const coins = await getAsyncStorage('coins')
        const coinsPlus = coins + 3000
        await setAsyncStorage('coins', coinsPlus);
        const coinsUpdated = await getAsyncStorage('coins')
        setTotalCoins(coinsUpdated);
        console.warn('GANA COINS: +3000')
    }

    async function addBoyToStorage() {
        moreThanOneCharacter()
        const finalBoy = { character: ['fatBoy'] };
        const characterListStorage = await getAsyncStorage('character');
        if (!characterListStorage) {
            await setAsyncStorage('character', finalBoy);
        }
    }

    async function changeCharacter() {
        setEveryFeetFalse();
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

    const winCoinsWhenSwipe = async () => {
        if (progress >= 1) { setFinishedGameBar(true) }
        const coins = await getAsyncStorage('coins');
        if (doubleScore) {
            await setAsyncStorage('coins', coins + 2);
            setProgress(progress + 0.02)
        } else {
            await setAsyncStorage('coins', coins + 1);
            setProgress(progress + 0.01)
        }
        const coinsAfterSwipe = await getAsyncStorage('coins');
        setTotalCoins(coinsAfterSwipe)
        if (progress >= 1) {
            finishGame()
        }
    }

    const setEveryFeetFalse = () => {
        setMoveRightToRight(false)
        setMoveLeftToRight(false)
        setMoveLeftToLeft(false)
        setMoveRightToLeft(false)
    }

    const checkCoins = async () => {
        const coins = await getAsyncStorage('coins');
        setTotalCoins(coins)
        return coins
    }

    const checkGames = async () => {
        const gamesStorage = await getAsyncStorage('games');
        if (!gamesStorage) {
            await setAsyncStorage('games', 0)
            return setGames(0)
        }
        setGames(gamesStorage)
    }

    const chargeAdInterstitial = async () => {
        AdMobInterstitial.setAdUnitID('ca-app-pub-9901220615892956/5784632384');
        await AdMobInterstitial.requestAd();
        AdMobInterstitial.showAd()
    }

    useEffect(() => {
        checkCoins()
        checkGames()
        addBoyToStorage()
        chargeInAppPurchases()
        //Platform.OS === 'android' ? chargeInAppPurchases() : null
    }, [])

    const doubleScoreFunction = () => setTimeout(() => { setDoubleScore(true); setScoreCallback() }, 1000);
    const setScoreCallback = () => setTimeout(() => setDoubleScore(false), 50000);

    const updateCoinsCallback = async (coins: number) => {
        await setAsyncStorage('coins', coins);
        setTotalCoins(coins)
    }

    const finishGame = async () => {
        const gamesStorage = await getAsyncStorage('games');
        if (progress >= 1) {
            await setAsyncStorage('games', gamesStorage + 1);
            const currentGamesWonWithThisOne = await getAsyncStorage('games');
            const multiplesFive = multipleFive(currentGamesWonWithThisOne)
            setGames(gamesStorage + 1)
            if (multiplosCincoMasUno) {
                setShowAlertPassAndWinCoinsGame(true)
                const coins = await getAsyncStorage('coins');
                const coinsPlus = coins + 200;
                await setAsyncStorage('coins', coinsPlus);
                setTotalCoins(coinsPlus)
                setStartGame(false)
                setOnFire(false)
                setProgress(0)
                setMultiplosCincoMasUno(false)
                return true
            }
            if (multiplesFive) {
                setShowAlertPassGame(true)
                setMultiplosCincoMasUno(true)
                setStartGame(false)
                setOnFire(true)
                setProgress(0)
                return true
            };
            setShowAlertPassGame(true)
            setStartGame(false)
            setProgress(0)

        } else {
            setShowAlertMissGame(true)
            setStartGame(false)
            setProgress(0)
        }
    }

    const handleStateAlert = (newValue: boolean) => setShowAlertMissGame(newValue);
    const handleStatePassAlert = (newValue: boolean) => setShowAlertPassGame(newValue);
    const handleStatePassAndWinCoinsAlert = (newValue: boolean) => setShowAlertPassAndWinCoinsGame(newValue);
    const handleStateInformation = (newValue: boolean) => setShowAlertInformation(newValue);

    return (
        <ImageBackground
            source={onFire ? fatImages.livingroom : fatImages.livingroom}
            style={{ flex: 1 }}>
            <View
                style={{ height: layout.layout.height, width: layout.layout.width, margin: 5, marginLeft: '3.5%' }}>
                <View style={{ width: layout.layout.width, flex: 0.2, flexDirection: 'row' }}>
                    <Coins totalCoins={totalCoins} />
                    <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatedPowerBar progress={progress} />
                    </View>
                    <TouchableOpacity
                        onPress={() => { setEveryFeetFalse(); setModalVisible(true) }}
                        style={{ flex: 0.15, marginRight: Platform.OS === 'android' ? null : '2%' }}>
                        <Image
                            style={{ height: 80, width: 80, resizeMode: 'stretch', justifyContent: 'center', alignItems: 'center', marginLeft: 30 }}
                            source={fatImages.shopIcon} />
                        <View style={{ left: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 20, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold' }}>GAMES: {games}</Text>
                        </View>
                        <ModalShop
                            updateCoinsCallback={updateCoinsCallback}
                            onPressCancel={() => {
                                setModalVisible(!modalVisible);
                                moreThanOneCharacter()
                            }}
                            itemsForPurchase={itemsForPurchase}
                            visible={modalVisible} />
                    </TouchableOpacity>

                </View>

                <View style={{ width: 300, height: 20, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 20, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', textAlign: 'center' }}>LIVINGROOM   UP   AND   DOWN   TICKLES</Text>
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
                                        onPress={() => {
                                            setFinishedGameBar(false);
                                            setStartGame(true)
                                        }}
                                        start
                                        textColor={'white'}
                                        text={'Start Game'} />
                                </View>
                            }
                        </View>
                        <ButtonRounded
                            onPress={async () => {
                                await chargeAdInterstitial();
                                setEveryFeetFalse();
                                doubleScoreFunction();
                            }}
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
                            <ButtonIcon action={'Bathroom'} icon={fatImages.bathroom} place={'Bathroom'} />
                            : null
                        }
                    </View >
                    <LeftFootVertical
                        onSwipeLeft={() => (startGame && !correlacionTresForGame) ? onSwipeLeftFootToLeft() : startGame && correlacionTresForGame && leftGame ? onSwipeLeftFootToLeft() : null}
                        onSwipeRight={() => (startGame && !correlacionTresForGame) ? onSwipeLeftFootToRight() : startGame && correlacionTresForGame && leftGame ? onSwipeLeftFootToRight() : null}
                        layout={layout}
                        characterChosen={characterForHeadOrFeet(characterFinal)}
                        leftBlackFoot={fatImages.leftBlackFoot}
                        leftWhiteFoot={fatImages.leftWhiteFoot}
                        cakeLeftFoot={fatImages.cakeLeftFoot}
                        lipLeftFoot={fatImages.lipLeftFoot}
                        blueLeftFoot={fatImages.blueLeftFoot}
                        moveLeftToRight={moveLeftToRight}
                        moveLeftToLeft={moveLeftToLeft} />

                    <TextHelper startGame={startGame} left={'30%'} onlineGame={leftGame} text={'Left'} />
                    <TextHelper startGame={startGame} left={'60%'} onlineGame={rightGame} text={'Right'} />


                    <TouchableOpacity
                        onPress={() => { setShowAlertInformation(true) }}
                        style={{ zIndex: 1000, position: 'absolute', top: '8%', left: '86%' }}>
                        <Image
                            style={{ height: 40, width: 40 }}
                            source={fatImages.consoleQuestion} />
                    </TouchableOpacity>

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

                    <RightFootVertical
                        onSwipeLeft={() => (startGame && !correlacionTresForGame) ? onSwipeRightFootToLeft() : startGame && correlacionTresForGame && rightGame ? onSwipeRightFootToLeft() : null}
                        onSwipeRight={() => (startGame && !correlacionTresForGame) ? onSwipeRightFootToRight() : startGame && correlacionTresForGame && rightGame ? onSwipeRightFootToLeft() : null}
                        layout={layout}
                        characterChosen={characterForHeadOrFeet(characterFinal)}
                        rightBlackFoot={fatImages.rightBlackFoot}
                        rightWhiteFoot={fatImages.rightWhiteFoot}
                        cakeRightFoot={fatImages.cakeRightFoot}
                        lipRightFoot={fatImages.lipRightFoot}
                        blueRightFoot={fatImages.blueRightFoot}
                        moveRightToRight={moveRightToRight}
                        moveRightToLeft={moveRightToLeft} />

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
                            messageText="+  1   game!"
                            icon={fatImages.success}
                        />
                        : null
                    }

                    {showAlertPassAndWinCoinsGame ?
                        <CustomAlert
                            showAlert={showAlertPassAndWinCoinsGame}
                            onShow={handleStatePassAndWinCoinsAlert}
                            titleText="Congratulations"
                            messageText="+  1  game    +   200  coins!"
                            icon={fatImages.coinImage}
                        />
                        : null
                    }

                    {showAlertInformation ?
                        <CustomAlert
                            showAlert={showAlertInformation}
                            onShow={handleStateInformation}
                            titleText="Livingroom     Tickle    Up   and    Down   Game"
                            messageText="START GAME   and   SWIPE   Up   and   Down   a   FOOT"
                            heightImage={100}
                            widthImage={100}
                            icon={fatImages.scrollUpDown}
                        />
                        : null
                    }
                </View>
            </View>

        </ImageBackground >
    )
}

export default LivingroomPage