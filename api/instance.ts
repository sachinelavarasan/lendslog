import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? Platform.OS === 'android'
        ? process.env.EXPO_PUBLIC_ANDROID_LOCAL_API
        : process.env.EXPO_PUBLIC_IOS_LOCAL_API
      : process.env.EXPO_PUBLIC_LIVE_API,
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("@jwtToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log('🚀 ~ error:', error);
    Promise.reject(error);
  }
);

export default instance;
