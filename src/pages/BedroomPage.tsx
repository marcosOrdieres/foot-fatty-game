import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, ImageBackground, Alert, Platform } from 'react-native';
import { characterForHeadOrFeet, multipleFive } from '../helper-functions/utils'
import { getAsyncStorage, setAsyncStorage } from '../services/storage-service';
import * as fatImages from '../assets'
import { AnimatedPowerBar, ButtonRounded, RightFoot, LeftFoot, Head, Ducks, ModalShop, Sponges, Countdown, ButtonIcon } from '../components';
//import { ChangeHeadArray } from '../helper-functions/changeHead'
const { width, height } = Dimensions.get('window');

//asyncStorage keys: character, coins, duck, games, duster

const BedroomPage = () => {
    const [layout] = useState({ layout: { height, width } });
    const [onFire, setOnFire] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemsForPurchase, setItemsForPurchase] = useState(null);
    const [totalCoins, setTotalCoins] = useState(0);

    const checkCoins = async () => {
        const coins = await getAsyncStorage('coins');
        setTotalCoins(coins)
        return coins
    }

    useEffect(() => {
        checkCoins()
    }, [])

    return (
        <ImageBackground
            source={onFire ? fatImages.imageBedroomBig : fatImages.imageBedroomBig}
            style={{ flex: 1 }}>
            <View
                style={{ height: layout.layout.height, width: layout.layout.width, margin: 5, marginLeft: '3.5%' }}>



                <View style={{ width: layout.layout.width, flex: 0.2, flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, flexDirection: 'row' }}>
                        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                style={{ height: 50, width: 50, resizeMode: 'stretch', position: 'absolute' }}
                                source={fatImages.coinImage} />
                        </View>
                        <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: totalCoins >= 1000 ? 30 : 45, fontFamily: 'Arcade-Classic' }}>{totalCoins}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatedPowerBar
                            progress={50}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => { setModalVisible(true) }}
                        style={{ flex: 0.15 }}>
                        <Image
                            style={{ height: 80, width: 80, resizeMode: 'stretch', justifyContent: 'center', alignItems: 'center', marginLeft: 30 }}
                            source={fatImages.shopIcon} />
                        <View style={{ top: 5, left: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 25, fontFamily: 'Arcade-Classic' }}>GAMES: 10</Text>
                        </View>

                        {/* <Ducks ducks={theDucks} /> */}

                        <ModalShop
                            //updateCoinsCallback={updateCoinsCallback}
                            onPressCancel={() => {
                                setModalVisible(!modalVisible);
                                //getTheDucks()
                                //moreThanOneCharacter()
                            }}
                            itemsForPurchase={itemsForPurchase}
                            visible={modalVisible} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: 300, height: 20, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 25, fontFamily: 'Arcade-Classic', textAlign: 'center' }}>BEDROOM   PUNCHES</Text>
                </View>
                <View style={{ width: layout.layout.width, flex: 0.8, flexDirection: 'row' }}>
                    <View style={{ width: '25%', height: '100%' }}>
                        <View>
                            {false ?
                                <Countdown
                                    //finishedGameBar={finishedGameBar}
                                    onFire={onFire}
                                    //onFinish={() => finishGame()}
                                    secondsGame={50}
                                    secondsGameOnFire={40}
                                />
                                :
                                <View>
                                    <ButtonRounded
                                        // onPress={() => {
                                        //     correlacionDeTres()
                                        //     setFinishedGameBar(false);
                                        //     setStartGame(true)
                                        // }}
                                        start
                                        textColor={'white'}
                                        text={'Start Game'} />
                                </View>
                            }
                        </View>

                        <ButtonRounded
                            // onPress={() => {
                            //     setEveryFeetFalse();
                            //     doubleScoreFunction();
                            // }}
                            marginTop={'15%'}
                            watchVideo
                            text={'X2 - Watch Video'} />
                        <ButtonRounded
                            //onPress={() => changeCharacter()}
                            moreThanOneCharacted={false}
                            marginTop={'10%'}
                            textColor={'black'}
                            text={'Change Character'} />
                        <ButtonIcon action={'Bathroom'} icon={fatImages.bathroom} />
                        <Text style={{ marginRight: '35%', fontSize: 14, fontFamily: 'Arcade-Classic', textAlign: 'center' }}>Bathroom</Text>
                    </View >
                    <LeftFoot
                        //onSwipeLeft={() => (startGame && !correlacionTresForGame) ? onSwipeLeftFootToLeft() : startGame && correlacionTresForGame && leftGame ? onSwipeLeftFootToLeft() : null}
                        //onSwipeRight={() => (startGame && !correlacionTresForGame) ? onSwipeLeftFootToRight() : startGame && correlacionTresForGame && leftGame ? onSwipeLeftFootToRight() : null}
                        layout={layout}
                        characterChosen={characterForHeadOrFeet('fatBoy')}
                        leftBlackFoot={fatImages.leftBlackFoot}
                        leftWhiteFoot={fatImages.leftWhiteFoot}
                        cakeLeftFoot={fatImages.cakeLeftFoot}
                        lipLeftFoot={fatImages.lipLeftFoot}
                        blueLeftFoot={fatImages.blueLeftFoot}
                    //moveLeftToRight={moveLeftToRight}
                    //moveLeftToLeft={moveLeftToLeft} 
                    />
                    {/* <View style={{ position: 'absolute', left: '28%', top: '10%' }}><Text style={{ color: 'red', fontSize: 30, fontWeight: 'bold' }}>{startGame && leftGame ? 'Left' : ''}</Text></View> */}
                    {/* <View style={{ position: 'absolute', left: '65%', top: '10%' }}><Text style={{ color: 'red', fontSize: 30, fontWeight: 'bold' }}>{startGame && rightGame ? 'Right' : ''}</Text></View> */}

                    {/* <Sponges
                        sponges={sponges}
                        games={games}
                        width={width}
                        height={height} /> */}

                    <Head
                        layout={layout}
                        characterChosen={characterForHeadOrFeet('fatBoy')}
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

                    <RightFoot
                        //onSwipeLeft={() => (startGame && !correlacionTresForGame) ? onSwipeRightFootToLeft() : startGame && correlacionTresForGame && rightGame ? onSwipeRightFootToLeft() : null}
                        //onSwipeRight={() => (startGame && !correlacionTresForGame) ? onSwipeRightFootToRight() : startGame && correlacionTresForGame && rightGame ? onSwipeRightFootToLeft() : null}
                        layout={layout}
                        characterChosen={characterForHeadOrFeet('fatBoy')}
                        rightBlackFoot={fatImages.rightBlackFoot}
                        rightWhiteFoot={fatImages.rightWhiteFoot}
                        cakeRightFoot={fatImages.cakeRightFoot}
                        lipRightFoot={fatImages.lipRightFoot}
                        blueRightFoot={fatImages.blueRightFoot}
                    //moveRightToRight={moveRightToRight}
                    //moveRightToLeft={moveRightToLeft} 
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