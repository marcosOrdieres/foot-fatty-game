import React from 'react'
import { Image, Platform } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

interface CustomAlertProps {
    showAlert?: boolean,
    onShow?: any,
    titleText?: string,
    messageText?: string,
    icon?: any,
}


const CustomAlert: React.FunctionComponent<CustomAlertProps> = ({ titleText, messageText, icon, showAlert, onShow }) => {

    const handleStateAlert = () => {
        onShow(!showAlert);
    };
    return (
        <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={titleText}
            message={messageText}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Confirm"
            titleStyle={{ fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null, fontSize: 30 }}
            messageStyle={{ fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null, fontSize: 20 }}
            confirmButtonTextStyle={{ fontFamily: Platform.OS === 'android' ? 'Arcade-Classic' : null, fontSize: 20 }}
            confirmButtonColor={'green'}
            onConfirmPressed={handleStateAlert}
            customView={<Image
                style={{ marginTop: 20, height: 50, width: 50, resizeMode: 'stretch' }}
                source={icon} />}
        />
    )
}

export default CustomAlert