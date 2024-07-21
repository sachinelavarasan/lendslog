import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

export const deviceWidth = () => {
  return Dimensions.get('screen').width;
};
export const deviceHeight = () => {
  return Dimensions.get('screen').height;
};

export const asyncToken = async (key: string)=>{
  try {
    let value = await AsyncStorage.getItem(key)
    return value
  } catch (error) {
    return null;
  }
}