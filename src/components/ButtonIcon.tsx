import React from 'react'
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface DrawerProps {
    action?: string,
    icon?: string
}


const ButtonIcon: React.FunctionComponent<DrawerProps> = ({ action, icon }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate(action) }}
            style={{ marginTop: '10%', paddingLeft: '15%' }}>
            <Image
                style={{ height: 60, width: 60 }}
                source={icon} />
        </TouchableOpacity>
    )
}

ButtonIcon.defaultProps = {
    action: 'Bathroom',
    icon: 'icon'
}

export default ButtonIcon