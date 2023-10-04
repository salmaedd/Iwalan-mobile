import { Linking, Alert, Platform } from 'react-native';

/**
 * comunication chanels with iwaco client
 */

export const callClient = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    }
    else {
        phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('oops! Err');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => /*console.log(err)*/{});
};


export const chatWhatsAppClient = (phoneWithCountryCode, msg = '') => {
    let mobile = Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
        if (msg != '') {
            let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
            Linking.openURL(url).then((data) => {
               // console.log('WhatsApp Opened');
            }).catch(() => {
                Alert.alert('Install whatsapp please !');
            });
        } else {
            Linking.openURL(`whatsapp://send?phone=${mobile}`).catch(() => {
                Alert.alert('Install whatsapp please !');
            });
        }
    } else {
       // console.log('Please insert mobile number');
    }
}