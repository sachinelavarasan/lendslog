import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome } from '@expo/vector-icons';

interface CustomSelectInputProps {
  options: { key: any; value: any }[];
  defaultOption?: { key: any; value: any } | undefined;
  label: string;
  placeholder?: string;
  onChange: (id: number | string) => void;
  value: string | number;
}

export const CustomSelectInput = ({
  options,
  label,
  onChange,
  placeholder,
  value,
}: CustomSelectInputProps) => {
  const [selected, setSelected] = useState(value);
  const [defaultOption, setDefaultOption] = useState<{ key: any; value: any } | undefined>();

  useEffect(() => {
    const curr = options.find(opt => opt.key === selected);
    setDefaultOption(curr);
  }, [selected, value]);

  return (
    <View style={styles.selectBoxContainer}>
      {label && <Text style={styles.labelStyles}>{label}</Text>}
      <SelectList
        onSelect={() => onChange(selected)}
        setSelected={setSelected}
        fontFamily="Inter-500"
        data={options}
        arrowicon={<FontAwesome name="chevron-down" size={16} color={'#C7C7C7'} />}
        search={false}
        boxStyles={styles.boxStyles} // Apply custom styles
        defaultOption={defaultOption} //default selected option
        dropdownStyles={styles.dropdownStyles}
        inputStyles={styles.inputStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        maxHeight={150}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectBoxContainer: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  boxStyles: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 0,
    backgroundColor: '#14141d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 16,
    fontFamily: 'Inter-300',
    color: '#FFFFFF',
  },
  dropdownStyles: { backgroundColor: '#14141D', borderWidth: 0 },
  inputStyles: {
    color: '#c7c7c7',
    paddingVertical: Platform.OS === 'android' ? 4 : 6,
  },
  dropdownTextStyles: {
    color: '#c7c7c7',
  },
  labelStyles: {
    fontSize: 16,
    color: '#c7c7c7',
    marginBottom: 6,
    fontFamily: 'Inter-400',
  },
});
