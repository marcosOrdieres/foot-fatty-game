import { ModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React from 'react'
import { Image, Platform } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

interface CustomAlertProps {
    showAlert?: boolean,
    onShow?: any,
    titleText?: string,
    messageText?: string,
    icon?: any,
    widthImage?: number,
    heightImage?: number,
}


const CustomAlert: React.FunctionComponent<CustomAlertProps> = ({ titleText, messageText, icon, showAlert, onShow, widthImage, heightImage }) => {

    const handleStateAlert = () => {
        onShow(!showAlert);
    };
    return (
        <AwesomeAlert
            modalProps={{ supportedOrientations: ['landscape', 'portrait'] }}
            show={showAlert}
            showProgress={false}
            title={titleText}
            message={messageText}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Confirm"
            titleStyle={{ fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', fontSize: 30 }}
            messageStyle={{ fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', fontSize: 20 }}
            confirmButtonTextStyle={{ fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : 'Teko-Semibold', fontSize: 20 }}
            confirmButtonColor={'green'}
            onConfirmPressed={handleStateAlert}
            customView={<Image
                style={{ marginTop: 20, height: heightImage ? heightImage : 50, width: widthImage ? widthImage : 50, resizeMode: 'stretch' }}
                source={icon} />}
        />
    )
}

export default CustomAlert