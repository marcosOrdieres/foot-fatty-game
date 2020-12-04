import React from 'react'
import { View, Text, Linking } from 'react-native';

interface PrivacyPolicyProps {
    url?: string,
}


const PrivacyPolicy: React.FunctionComponent<PrivacyPolicyProps> = ({ url }) => {
    return (
        <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Text
                onPress={() => Linking.openURL(url)}
                style={{ textDecorationLine: 'underline', color: '#80aaff', textAlign: 'center', marginLeft: 480, marginTop: 300, fontSize: 15, fontFamily: 'Arcade-Classic' }}>Privacy Policy</Text>
        </View >
    )
}

PrivacyPolicy.defaultProps = {
    url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
}

export default PrivacyPolicy