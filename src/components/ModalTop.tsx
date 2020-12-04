import React from 'react'
import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
const { width, height } = Dimensions.get('window');

interface ModalTopProps {
    items: boolean,
    itemsChange: boolean,
    onChangeItems: any
}


const ModalTop: React.FunctionComponent<ModalTopProps> = ({ items, itemsChange, onChangeItems }) => {
    const handleStateItems = () => {
        console.log('esto que es', itemsChange)
        onChangeItems(itemsChange);
    };

    return (
        items ?
            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, fontStyle: 'normal', fontFamily: 'Arcade-Classic' }}>SHOP</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: width }}>
                    <View style={{ flex: 0.45, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={{ borderWidth: 1, borderRadius: 10, borderColor: 'grey', height: height / 10, alignItems: 'center', justifyContent: 'center' }}
                            onPress={handleStateItems}>
                            <Text style={{ fontSize: 20, fontFamily: 'Arcade-Classic', padding: 5, color: 'grey' }}>Characters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ borderWidth: 3, borderRadius: 10, borderColor: 'black', marginLeft: 10, height: height / 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Arcade-Classic', padding: 5, color: 'black' }}>Items</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.55 }}>
                    </View>
                </View>
            </View>
            :
            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>

                <Text style={{ fontSize: 30, fontStyle: 'normal', fontFamily: 'Arcade-Classic' }}>SHOP</Text>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: width }}>

                    <View style={{ flex: 0.45, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={{ borderWidth: 3, borderRadius: 10, borderColor: 'black', marginLeft: 10, height: height / 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontStyle: 'normal', fontFamily: 'Arcade-Classic', padding: 5, color: 'black' }}>Characters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ borderWidth: 1, borderRadius: 10, marginLeft: 10, borderColor: 'grey', height: height / 10, alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}
                            onPress={handleStateItems}>
                            <Text style={{ fontSize: 20, fontStyle: 'normal', fontFamily: 'Arcade-Classic', opacity: 0.5, padding: 5, color: 'black' }}>Items</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.55 }}>
                    </View>
                </View>
            </View>
    )
}

ModalTop.defaultProps = {
    props: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
}

export default ModalTop