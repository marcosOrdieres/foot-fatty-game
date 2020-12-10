
import { ToastAndroid, Alert } from 'react-native';
import { ToastInterface } from '../interfaces'
import { getAsyncStorage, setAsyncStorage } from '../services/storage-service';

export const Toast = ({ visible, message }: ToastInterface) => {
    if (visible) {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
        return null;
    }
    return null;
};

export const characterForHeadOrFeet = (characterFinal: string | string[]) => {
    switch (characterFinal) {
        case 'blackGirl':
            return 'blackGirl'
        case 'blackGirlSecond':
            return 'blackGirlSecond'
        case 'blackGirlThird':
            return 'blackGirlThird'
        case 'cakeGirl':
            return 'cakeGirl'
        case 'lipsGirl':
            return 'lipsGirl'
        case 'fatboySecond':
            return 'fatboySecond'
        case 'fatboyThird':
            return 'fatboyThird'
        case 'blueGirl':
            return 'blueGirl'
        case 'blueGirlSecond':
            return 'blueGirlSecond'
        case 'blueGirlThird':
            return 'blueGirlThird'
        default:
            return 'fatBoy'
    }
}

export const multipleFive = (currentGamesWonWithThisOne: number): boolean => {
    if (currentGamesWonWithThisOne % 5 === 0) {
        return true
    } else {
        return false
    }
}

export const goldenPrice = async (goldenPrice: string) => {
    const characterListStorage = await getAsyncStorage('character');
    const duckStorage = await getAsyncStorage('duck');
    const gamesStorage = await getAsyncStorage('games');
    switch (goldenPrice) {
        case 'goldenDiploma':
            if (gamesStorage > 20) {
                console.warn('deberia de entrar por aqui');

                storeGoldenPrice('goldenDiploma')
            } else {
                Alert.alert('NOT ENOUGH GAMES')
            }
            break;

        case 'goldenMedal':
            if (gamesStorage >= 30 && duckStorage?.duck?.length === 3) {
                storeGoldenPrice('goldenMedal')
            } else {
                Alert.alert('NOT ENOUGH GAMES OR DUCKS')
            }
            break;
        case 'goldenTrophy':
            if (gamesStorage >= 50 && characterListStorage?.character?.length === 5 && duckStorage?.duck?.length === 3) {
                storeGoldenPrice('goldenTrophy')
            } else {
                Alert.alert('NOT ENOUGH GAMES,  DUCKS OR CHARACTERS')
            }
            break;
    }
}

const storeGoldenPrice = async (goldenPriceString: string) => {
    const goldenPriceToStorage = { goldenPrice: [goldenPriceString] };
    const goldenPriceStorage = await getAsyncStorage('goldenPrice');
    if (!goldenPriceStorage) {
        await setAsyncStorage('goldenPrice', goldenPriceToStorage);
    } else {
        goldenPriceStorage.goldenPrice.push(goldenPriceString)
        await setAsyncStorage('goldenPrice', goldenPriceStorage);
    }
}

export const wasteCoinsAndStoreDuck = async (coinsInModal: number, coinsCostDuck: number, duck: any) => {
    if (coinsInModal < coinsCostDuck) {
        Alert.alert('NOT ENOUGH COINS')
        return false
    } else {
        const coinsMinus = coinsInModal - coinsCostDuck;
        const duckString = duck.duck;
        await setAsyncStorage('coins', coinsMinus);
        const duckToStorage = { duck: [...duckString] };

        const duckStorage = await getAsyncStorage('duck');
        console.warn('duck storage: ', duckStorage)
        if (!duckStorage) {
            await setAsyncStorage('duck', duckToStorage);
        } else {
            duckStorage.duck.push(...duckString)
            await setAsyncStorage('duck', duckStorage);
        }
        console.warn(`PAGADO: - ${coinsCostDuck}`)
        return coinsMinus;
    }
}

export const spendCoinsForCharacter = async (coinsInModal: number, coinsCostCharacter: number, character: string) => {
    if (coinsInModal < coinsCostCharacter) {
        Alert.alert('NOT ENOUGH COINS')
        return false
    } else {
        const coinsMinus = coinsInModal - coinsCostCharacter;
        await setAsyncStorage('coins', coinsMinus);
        const storageChar = await getAsyncStorage('character');
        storageChar.character.push(character)
        await setAsyncStorage('character', storageChar);
        console.warn(`PAGADO: - ${coinsCostCharacter}`)
        return coinsMinus;
    }
}


// if (coinsInModal < 15000) {
//     Alert.alert('NOT ENOUGH COINS')
// } else {
//     const coinsMinus15000 = coinsInModal - 15000;
//     await setAsyncStorage('coins', coinsMinus15000);
//     const storageChar = await getAsyncStorage('character');
//     storageChar.character.push('cakeGirl')
//     await setAsyncStorage('character', storageChar);
//     updateCoinsCallback(coinsMinus15000);
//     console.warn('PAGADO: -15000')
// }

// const coinsMinus6000 = coinsInModal - 6000;
// await setAsyncStorage('coins', coinsMinus6000);

// const pinkDuck = { duck: ['pinkDuck'] };
// const duckStorage = await getAsyncStorage('duck');
// if (!duckStorage) {
//     await setAsyncStorage('duck', pinkDuck);
// } else {
//     duckStorage.duck.push('pinkDuck')
//     await setAsyncStorage('duck', duckStorage);
// }