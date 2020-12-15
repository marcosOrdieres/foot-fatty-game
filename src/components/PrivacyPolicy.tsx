import React from 'react'
import { View, Text, Linking, Platform } from 'react-native';

interface PrivacyPolicyProps {
    url?: string,
}


const PrivacyPolicy: React.FunctionComponent<PrivacyPolicyProps> = ({ url }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text
                onPress={() => Linking.openURL(url)}
                style={{ textDecorationLine: 'underline', color: '#80aaff', textAlign: 'center', fontSize: 15, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold' }}>Privacy Policy</Text>
        </View >
    )
}

PrivacyPolicy.defaultProps = {
    url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
}

export default PrivacyPolicy