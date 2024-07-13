import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export const CustomSelectInput = () => {
  const [selected, setSelected] = useState('');
  const data = [
    { key: '1', value: 'Jammu & Kashmir' },
    { key: '2', value: 'Gujrat' },
    { key: '3', value: 'Maharashtra' },
    { key: '4', value: 'Goa' },
    { key: '5', value: 'Tamilnadu' },
    { key: '6', value: 'Karnataka' },
    { key: '7', value: 'Andhra Pradesh' },
    { key: '8', value: 'Keralam' },
  ];
  return (
    <View style={styles.selectBoxContainer}>
      <Text style={styles.labelStyles}>Choose state</Text>
      <SelectList
        onSelect={() => alert(selected)}
        setSelected={setSelected}
        fontFamily="Inter-500"
        data={data}
        arrowicon={<FontAwesome name="chevron-down" size={16} color={'#C7C7C7'} />}
        // searchicon={<FontAwesome name="search" size={20} color={'#C7C7C7'} />}
        search={false}
        // boxStyles={{ borderRadius: 8, backgroundColor: '#ffff', borderWidth: 0 }} //override default styles
        boxStyles={styles.boxStyles} // Apply custom styles
        defaultOption={{ key: '1', value: 'Jammu & Kashmir' }} //default selected option
        dropdownStyles={styles.dropdownStyles}
        inputStyles={styles.inputStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        maxHeight={150}
        placeholder="search here"
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
    padding:0,
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
  }
});
