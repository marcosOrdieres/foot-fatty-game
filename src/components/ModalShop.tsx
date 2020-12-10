import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { getAsyncStorage, setAsyncStorage } from '../services/storage-service';
import * as fatImages from '../assets'
import { Cancel, ModalTop, ButtonItemAndChar } from '../components';
import { goldenPrice, spendCoinsForCharacter, wasteCoinsAndStoreDuck } from '../helper-functions/utils';
import { BigButton, PrivacyPolicy } from '../components';

//import * as InAppPurchases from 'expo-in-app-purchases';

interface ModalProps {
    props?: any,
    updateCoinsCallback: any,
    visible: boolean,
    onPressCancel: any,
    itemsForPurchase: any
}

const ModalShop: React.FunctionComponent<ModalProps> = ({ visible, onPressCancel, updateCoinsCallback, itemsForPurchase }) => {
    const [layout, setLayout] = useState({
        layout: {
            height: height,
            width: width
        }
    });


    const onLayout = (event: any) => setLayout({ layout: { height: event.nativeEvent.layout.height, width: event.nativeEvent.layout.width } });

    let coinsInModal: number;

    const checkCoins = async () => {
        const coins = await getAsyncStorage('coins');
        coinsInModal = coins
        return coins
    }
    checkCoins()

    const checkItemsAndCharactersForOpacity = async () => {
        const storageChar = await getAsyncStorage('character');
        if (storageChar) {
            storageChar.character.map((value: string) => {
                if (value === 'blackGirl') return setBlackGirlOpacity(true)
                if (value === 'lipsGirl') return setLipsGirlOpacity(true)
                if (value === 'cakeGirl') return setCakeGirlOpacity(true)
                if (value === 'blueGirl') return setBlueGirlOpacity(true)
            })
        }
        const storageItems = await getAsyncStorage('duck');
        if (storageItems) {
            storageItems.duck.map((value: string) => {
                if (value === 'yellowDuck') return setYellowDuckOpacity(true)
                if (value === 'pinkDuck') return setPinkDuckOpacity(true)
                if (value === 'greenDuck') return setGreenDuckOpacity(true)
            })
        }
        const storageGoldenPrices = await getAsyncStorage('goldenPrice');
        if (storageGoldenPrices) {
            console.log('dsdsdsd', goldenTrophyOpacity)
            storageGoldenPrices.goldenPrice.map((value: string) => {
                if (value === 'goldenDiploma') return setGoldenDiplomaOpacity(true)
                if (value === 'goldenMedal') return setGoldenMedalOpacity(true)
                if (value === 'goldenTrophy') return setGoldenTrophyOpacity(true)
            })
        }
    }
    checkItemsAndCharactersForOpacity()
    const [items, setItems] = useState(false);
    const [yellowDuckOpacity, setYellowDuckOpacity] = useState(false);
    const [pinkDuckOpacity, setPinkDuckOpacity] = useState(false);
    const [greenDuckOpacity, setGreenDuckOpacity] = useState(false);

    const [goldenDiplomaOpacity, setGoldenDiplomaOpacity] = useState(false);
    const [goldenMedalOpacity, setGoldenMedalOpacity] = useState(false);
    const [goldenTrophyOpacity, setGoldenTrophyOpacity] = useState(false);

    const [blackGirlOpacity, setBlackGirlOpacity] = useState(false);
    const [lipsGirlOpacity, setLipsGirlOpacity] = useState(false);
    const [cakeGirlOpacity, setCakeGirlOpacity] = useState(false);
    const [blueGirlOpacity, setBlueGirlOpacity] = useState(false);

    const handleStateItems = (newValue: boolean) => {
        setItems(newValue);
    };

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                supportedOrientations={['portrait', 'landscape']}
                onRequestClose={onPressCancel}>
                {items ?
                    <View
                        onLayout={onLayout}
                        style={{ flex: 1, flexDirection: 'column', margin: 20, backgroundColor: 'white', opacity: 0.9, borderRadius: 20 }}>
                        <ModalTop
                            items={items}
                            itemsChange={false}
                            onChangeItems={handleStateItems}
                        />
                        <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20 }}>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!yellowDuckOpacity ? async () => {
                                        const coinsMinus2000 = await wasteCoinsAndStoreDuck(coinsInModal, 2000, { duck: ['yellowDuck'] })
                                        if (coinsMinus2000) updateCoinsCallback(coinsMinus2000);
                                    } : () => console.warn('YA SE HA COMPRADO')}
                                    style={{ zIndex: 1000, width: 75, height: 75, borderColor: yellowDuckOpacity ? '#e5e5ff' : 'blue', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: yellowDuckOpacity ? 0.3 : null, height: 50, width: 50, resizeMode: 'stretch' }}
                                        source={fatImages.yellowDuck} />
                                </TouchableOpacity>
                                <ButtonItemAndChar duck opacity={yellowDuckOpacity} coins={3000} />
                            </View>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!pinkDuckOpacity ? async () => {
                                        const coinsMinus6000 = await wasteCoinsAndStoreDuck(coinsInModal, 6000, { duck: ['pinkDuck'] })
                                        if (coinsMinus6000) updateCoinsCallback(coinsMinus6000);
                                    } : () => console.warn('YA SE HA COMPRADO')}
                                    style={{ zIndex: 1000, width: 75, height: 75, borderColor: pinkDuckOpacity ? '#e5e5ff' : 'blue', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: pinkDuckOpacity ? 0.3 : null, height: 50, width: 50, resizeMode: 'stretch' }}
                                        source={fatImages.pinkDuck} />
                                </TouchableOpacity>
                                <ButtonItemAndChar duck opacity={pinkDuckOpacity} marginLeft={'33%'} coins={6000} />
                            </View>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!greenDuckOpacity ? async () => {
                                        const coinsMinus10000 = await wasteCoinsAndStoreDuck(coinsInModal, 10000, { duck: ['greenDuck'] })
                                        if (coinsMinus10000) updateCoinsCallback(coinsMinus10000);
                                    } : () => console.warn('YA SE HA COMPRADO')}
                                    style={{ zIndex: 1000, width: 75, height: 75, borderColor: greenDuckOpacity ? '#e5e5ff' : 'blue', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: greenDuckOpacity ? 0.3 : null, height: 50, width: 50, resizeMode: 'stretch' }}
                                        source={fatImages.greenDuck} />
                                </TouchableOpacity>
                                <ButtonItemAndChar duck opacity={greenDuckOpacity} coins={9000} />
                            </View>
                        </View>
                        <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20 }}>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!goldenDiplomaOpacity ? async () => {
                                        goldenPrice('goldenDiploma')
                                    } : () => console.warn('YA SE HA ganado')}
                                    style={{ zIndex: 1000, width: 75, height: 75, borderColor: goldenDiplomaOpacity ? '#e5e5ff' : 'blue', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: goldenDiplomaOpacity ? 0.3 : null, height: 60, width: 60, resizeMode: 'stretch' }}
                                        source={fatImages.goldenDiploma} />
                                </TouchableOpacity>
                                <ButtonItemAndChar opacity={goldenDiplomaOpacity} bestPriceText={'20 Games'} />
                            </View>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!goldenMedalOpacity ? async () => {
                                        goldenPrice('goldenMedal')
                                    } : () => console.warn('YA SE HA ganado')}
                                    style={{ zIndex: 1000, width: 75, height: 75, borderColor: goldenMedalOpacity ? '#e5e5ff' : 'blue', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: goldenMedalOpacity ? 0.3 : null, height: 60, width: 60, resizeMode: 'stretch' }}
                                        source={fatImages.goldenMedal} />
                                </TouchableOpacity>
                                <ButtonItemAndChar opacity={goldenMedalOpacity} marginLeft={'33%'} bestPriceText={'30 Games    3 Ducks'} />
                            </View>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!goldenTrophyOpacity ? () => {
                                        goldenPrice('goldenTrophy')
                                    } : () => console.warn('YA SE HA ganado')}
                                    style={{ zIndex: 1000, width: 75, height: 75, borderColor: goldenTrophyOpacity ? '#e5e5ff' : 'blue', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: goldenTrophyOpacity ? 0.3 : null, height: 60, width: 60, resizeMode: 'stretch' }}
                                        source={fatImages.goldenTrophy} />

                                </TouchableOpacity>
                                <ButtonItemAndChar opacity={goldenTrophyOpacity} marginLeft={'83%'} bestPriceText={'50 Games   3 Ducks   4 Characters'} />
                            </View>
                        </View>
                        <Cancel onPressCancel={onPressCancel} />
                    </View>

                    :

                    <View
                        onLayout={onLayout}
                        style={{ flex: 1, flexDirection: 'column', margin: 20, backgroundColor: 'white', opacity: 0.9, borderRadius: 20 }}>
                        <ModalTop
                            items={items}
                            itemsChange={true}
                            onChangeItems={handleStateItems}
                        />
                        <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20 }}>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!blackGirlOpacity ? async () => {
                                        const moneySpentCharacter = await spendCoinsForCharacter(coinsInModal, 3000, 'blackGirl')
                                        if (moneySpentCharacter) updateCoinsCallback(moneySpentCharacter);
                                    } : () => console.warn('YA SE HA COMPRADO')}
                                    style={{ zIndex: 1000, width: 100, height: 100, borderRadius: 10, borderColor: blackGirlOpacity ? '#ffcccc' : 'red', borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: blackGirlOpacity ? 0.3 : null, height: 75, width: 75, resizeMode: 'stretch' }}
                                        source={fatImages.blackGirl} />
                                </TouchableOpacity>
                                <ButtonItemAndChar opacity={cakeGirlOpacity} marginLeft={'1%'} coins={3000} />
                            </View>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!lipsGirlOpacity ? async () => {
                                        const moneySpentCharacter = await spendCoinsForCharacter(coinsInModal, 8000, 'lipsGirl')
                                        if (moneySpentCharacter) updateCoinsCallback(moneySpentCharacter);
                                    } : () => console.warn('YA SE HA COMPRADO')}
                                    style={{ zIndex: 1000, width: 100, height: 100, borderColor: lipsGirlOpacity ? '#ffcccc' : 'red', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: lipsGirlOpacity ? 0.3 : null, height: 75, width: 75, resizeMode: 'stretch' }}
                                        source={fatImages.lipsGirl} />
                                </TouchableOpacity>
                                <ButtonItemAndChar opacity={cakeGirlOpacity} marginLeft={'16%'} coins={8000} />
                            </View>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!cakeGirlOpacity ? async () => {
                                        const moneySpentCharacter = await spendCoinsForCharacter(coinsInModal, 12000, 'cakeGirl')
                                        if (moneySpentCharacter) updateCoinsCallback(moneySpentCharacter);
                                    } : () => console.warn('YA SE HA COMPRADO')}
                                    style={{ zIndex: 1000, width: 100, height: 100, borderColor: cakeGirlOpacity ? '#ffcccc' : 'red', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: cakeGirlOpacity ? 0.3 : null, height: 75, width: 100, resizeMode: 'stretch' }}
                                        source={fatImages.cakeGirl} />
                                </TouchableOpacity>
                                <ButtonItemAndChar opacity={cakeGirlOpacity} marginLeft={'31%'} coins={12000} />
                            </View>
                            <View style={{ alignItems: 'center', flex: 0.5 }}>
                                <TouchableOpacity
                                    onPress={!blueGirlOpacity ? async () => {
                                        const moneySpentCharacter = await spendCoinsForCharacter(coinsInModal, 15000, 'blueGirl')
                                        if (moneySpentCharacter) updateCoinsCallback(moneySpentCharacter);
                                    } : () => console.warn('YA SE HA COMPRADO')}
                                    style={{ zIndex: 1000, width: 100, height: 100, borderColor: blueGirlOpacity ? '#ffcccc' : 'red', borderWidth: 3, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ opacity: blueGirlOpacity ? 0.3 : null, height: 75, width: 60, resizeMode: 'stretch' }}
                                        source={fatImages.blueGirl} />
                                </TouchableOpacity>
                                <ButtonItemAndChar opacity={blueGirlOpacity} marginLeft={'50%'} coins={15000} />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <BigButton image={fatImages.coinImage} text={'+ 3000'} />
                                <PrivacyPolicy url={'https://mamarene.blogspot.com/2019/09/privacy-policy-fat-foot.html'} />
                            </View>

                        </View>
                        <Cancel onPressCancel={onPressCancel} />
                    </View>
                }
            </Modal>
        </View >
    )
}

const ModalStyles = StyleSheet.create({
    buttonActiveContainer: {
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'red',
        width: 200,
        height: 50
    }
}
)

ModalShop.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    updateCoinsCallback: () => console.warn('update coins'),
    visible: true,
    onPressCancel: () => console.warn('cancel')
}

export default ModalShop