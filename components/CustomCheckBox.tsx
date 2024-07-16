import React from 'react';
import { StyleProp, TextProps, ViewStyle } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface CustomCheckBoxProps{
  label?: string;
  disabled?: boolean;
  fillColor?: string;
  unFillColor?: string;
  innerIconStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextProps>
  onChange:((checked: boolean) => void)
}

export default function CustomCheckBox({label,disabled,fillColor,onChange}: CustomCheckBoxProps) {
  return (
    <BouncyCheckbox
      size={24}
      fillColor={fillColor}
      unFillColor='transparent'
      text={label}
      innerIconStyle={{ borderWidth: 1, borderRadius: 4 }}
      iconStyle={{ borderRadius: 4 }}
      textStyle={{ fontFamily: 'Inter-400', textDecorationLine: 'none', color: '#c7c7c7' }}
      disabled={disabled}
      onPress={(isChecked: boolean) => {
        onChange(isChecked);
      }}
    />
  );
}
