import React from 'react'
import { View, TouchableOpacity, Dimensions, Text, Platform, TouchableHighlight } from 'react-native';
const { width, height } = Dimensions.get('window');

interface ModalTopProps {
    items: boolean,
    itemsChange: boolean,
    onChangeItems: any
}


const ModalTop: React.FunctionComponent<ModalTopProps> = ({ items, itemsChange, onChangeItems }) => {
    const handleStateItems = () => {
        onChangeItems(itemsChange);
    };

    return (
        items ?
            <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, fontStyle: 'normal', fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold' }}>SHOP</Text>
                </View>
                <View style={{ flex: 0.5, width: width / 2, flexDirection: 'row' }}>
                    <TouchableHighlight
                        style={{ minHeight: height / 10, borderWidth: 1, borderRadius: 10, flex: 0.4, borderColor: 'grey', alignItems: 'center', justifyContent: 'center' }}
                        onPress={handleStateItems}>
                        <Text style={{ fontSize: 20, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', padding: 5, color: 'grey' }}>Characters</Text>
                    </TouchableHighlight>
                    <View style={{ flex: 0.1 }} />
                    <TouchableOpacity
                        style={{ minHeight: height / 10, borderWidth: 5, borderRadius: 10, flex: 0.4, borderColor: 'black', marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', padding: 5, color: 'black' }}>Items</Text>
                    </TouchableOpacity>
                </View>
            </View>
            :
            <View style={{ zIndex: 100, flexDirection: 'column', flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, fontStyle: 'normal', fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold' }}>SHOP</Text>
                </View>
                <View style={{ flex: 0.5, width: width / 2, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 5, borderRadius: 10, flex: 0.4, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontStyle: 'normal', fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', padding: 5, color: 'black' }}>Characters</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.1 }} />
                    <TouchableHighlight
                        style={{ borderWidth: 1, borderRadius: 10, flex: 0.4, borderColor: 'grey', alignItems: 'center', justifyContent: 'center' }}
                        onPress={handleStateItems}>
                        <Text style={{ fontSize: 20, fontStyle: 'normal', fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', padding: 5, color: 'grey' }}>Items</Text>
                    </TouchableHighlight>
                </View>
            </View>
    )
}

export default ModalTop