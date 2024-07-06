import React from 'react';
import { View } from 'react-native';

const Spacer = ({ height }: { height: number }) => {
  return <View style={{ height: height }} />;
};

export default Spacer;
