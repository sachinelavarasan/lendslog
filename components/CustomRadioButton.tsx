import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';

interface CustomRadioButtonProps {
  options: { id: any; label: string }[];
  onChange: (id: number | string) => void;
  value: number | string;
  label?: string;
  disabled?: boolean;
  isRequired?: boolean;
}

export default function CustomRadioButton({
  options,
  onChange,
  value,
  label,
  disabled,
  isRequired = false,
}: CustomRadioButtonProps) {
  const [selectedId, setSelectedId] = useState<string | number | undefined>(value);
  useEffect(() => {
    if (value) {
      setSelectedId(value);
    }
  }, [value]);

  function handlePress(id: string | number) {
    onChange(id);
    setSelectedId(id);
  }

  return (
    <>
      {label ? (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text
            style={[
              { fontSize: 16, color: '#c7c7c7', marginVertical: 3, fontFamily: 'Inter-400' },
            ]}>
            {label}
          </Text>
          {isRequired ? (
            <View style={{ marginLeft: 5, marginTop: 5 }}>
              <Image
                source={require('@/assets/icons/required.png')}
                style={{ width: 8, height: 8 }}
              />
            </View>
          ) : null}
        </View>
      ) : null}

      <View style={styles.container}>
        {options.map((button, index) => (
          <RadioButton
            {...button}
            key={button.id}
            labelStyle={styles.labelStyle}
            selected={button.id == selectedId}
            onPress={handlePress}
            borderColor="#FFCA3A"
            color="#FFCA3A"
            containerStyle={{ marginHorizontal: 0 }}
            disabled={disabled}
          />
        ))}
      </View>
    </>
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
