import React from 'react'
import { TouchableOpacity, Image, Text, Dimensions, Platform } from 'react-native';
import * as InAppPurchases from 'expo-in-app-purchases';
const { width, height } = Dimensions.get('window');

interface BigButtonProps {
    image?: any,
    text?: string,
    onPress?: any
}


const BigButton: React.FunctionComponent<BigButtonProps> = ({ image, text, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            // onPress={async () => {
            //     await InAppPurchases.purchaseItemAsync(itemsForPurchase[0].productId);
            // }}
            style={{ width: width / 5, height: height / 1.5, backgroundColor: 'green', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null }}>{text}</Text>
            <Image
                style={{ height: 50, width: 50, resizeMode: 'stretch' }}
                source={image} />

        </TouchableOpacity>
    )
}

BigButton.defaultProps = {
    image: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    text: 'text',

}

export default BigButton