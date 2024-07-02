import { View } from 'react-native';
import React from 'react';

const Spacer = ({ height }: { height: number }) => {
  return <View style={{ height: height }} />;
};

export default Spacer;
