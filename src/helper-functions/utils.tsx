
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