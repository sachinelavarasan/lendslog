import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function CustomCheckBox() {
  return (
    <BouncyCheckbox
      size={24}
      fillColor="rgba(255, 200, 58, 0.8)"
      unFillColor="transparent"
      text="Custom Checkbox"
      innerIconStyle={{ borderWidth: 1, borderRadius: 4 }}
      iconStyle={{ borderRadius: 4 }}
      textStyle={{ fontFamily: 'Inter-400', textDecorationLine: 'none', color: '#c7c7c7' }}
      disabled={true}
      onPress={(isChecked: boolean) => {
        console.log(isChecked);
      }}
    />
  );
}
