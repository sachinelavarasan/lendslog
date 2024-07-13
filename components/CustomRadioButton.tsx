import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RadioGroup, { RadioButton, RadioButtonProps } from 'react-native-radio-buttons-group';

export default function CustomRadioButton() {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Option 1',
        value: 'option1',
      },
      {
        id: '2',
        label: 'Option 2',
        value: 'option2',
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();
  function handlePress(id: string) {
    setSelectedId(id);
  }

  return (
    <View style={styles.container}>
      {radioButtons.map((button, index) => (
          <RadioButton
            {...button}
            key={button.id}
            labelStyle={styles.labelStyle}
            selected={button.id === selectedId}
            onPress={handlePress}
            borderColor="#FFCA3A"
            color="#FFCA3A"
            containerStyle={{ marginHorizontal: 0 }}
            // disabled
          />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  labelStyle: {
    fontSize: 16,
    color: '#c7c7c7',
    fontFamily: 'Inter-400',
  },
});
