import React from 'react'
import { TouchableOpacity, Image, Platform, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface DrawerProps {
    action?: string,
    icon?: string,
    place?: string
}


const ButtonIcon: React.FunctionComponent<DrawerProps> = ({ action, icon, place }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate(action) }}
            style={{ marginTop: '5%', width: '75%' }}>
            <Image
                style={{ height: 60, width: 60 }}
                source={icon} />
            <Text style={{ marginLeft: Platform.OS === 'android' ? null : '5%', fontSize: 14, fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', textAlign: 'left' }}>{place}</Text>

        </TouchableOpacity>
    )
}

ButtonIcon.defaultProps = {
    action: 'Bathroom',
    icon: 'icon'
}

export default ButtonIcon