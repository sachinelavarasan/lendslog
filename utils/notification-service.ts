import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid,Platform,} from 'react-native';


export async function requestUserPermission() {

    
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
          getFCMToken()
        }
    
}

const getFCMToken = async() =>{
    try {
        await messaging().registerDeviceForRemoteMessages();

        let fcmToken = await AsyncStorage.getItem('fcm_token')
        if(!!fcmToken){
           console.log("OLD FCM_TOKEN FOUND",fcmToken) 
        }else{
            const token = await messaging().getToken();
            await AsyncStorage.setItem('fcm_token', token)
            console.log("NEW FCM_TOKEN",token) 
        }
    } catch (error) {
        console.log("error during generating token",error)
    }
}

