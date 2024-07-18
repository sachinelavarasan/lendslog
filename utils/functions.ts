import { Dimensions } from 'react-native';

export const deviceWidth = () => {
  return Dimensions.get('screen').width;
};
export const deviceHeight = () => {
  return Dimensions.get('screen').height;
};
