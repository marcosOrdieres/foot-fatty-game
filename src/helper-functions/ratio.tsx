import { Platform } from 'react-native'


export const isTabletBasedOnRatio = (ratio: number) => {

    if (ratio > 1.6) {
        return false;
    } else {
        return true;
    }
}
