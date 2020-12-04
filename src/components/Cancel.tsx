import React from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

interface CancelProps {
    onPressCancel?: any
}

const Cancel: React.FunctionComponent<CancelProps> = ({ onPressCancel }) => {
    return (
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={onPressCancel}
                style={{ width: width / 3, height: height / 9, backgroundColor: 'black', borderRadius: 10, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontStyle: 'normal', fontFamily: 'Arcade-Classic', color: 'white' }}>CANCEL</Text>
            </TouchableOpacity>
        </View >
    )
}

export default Cancel