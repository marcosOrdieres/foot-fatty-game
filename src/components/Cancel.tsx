import React from 'react'
import { View, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

interface CancelProps {
    onPressCancel?: any
}

const Cancel: React.FunctionComponent<CancelProps> = ({ onPressCancel }) => {
    return (
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={onPressCancel}
                style={{ width: Platform.OS === 'android' ? width / 3 : width / 4, height: Platform.OS === 'android' ? height / 9 : height / 12, backgroundColor: 'black', borderRadius: 10, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontStyle: 'normal', fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', color: 'white' }}>CANCEL</Text>
            </TouchableOpacity>
        </View >
    )
}

export default Cancel