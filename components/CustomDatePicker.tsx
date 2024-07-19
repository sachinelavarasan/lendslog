import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DatePicker, { getFormatedDate, getToday } from 'react-native-modern-datepicker';

export default function CustomDatePicker({
  value = '',
  borderLess = true,
}: {
  value?: string;
  borderLess?: boolean;
}) {
  const [selectedDate, setSelectedDate] = useState(value || formatDate(getToday()));
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleConfirm = (date: string) => {
    if (date) {
      setSelectedDate(formatDate(date));
    }
    toggleDatePicker();
  };
  function formatDate(date: string) {
    const selectedDate = date.split('/').join('-');
    return getFormatedDate(new Date(selectedDate), 'DD-MM-YYYY');
  }
  return (
    <View style={{ position: 'relative', zIndex: 3 }}>
      <Pressable
        onPress={() => {
          toggleDatePicker();
        }}
        style={[styles.inputContainer, borderLess ? styles.borderNone : null, styles.innerView]}>
        <Text style={styles.input}>{selectedDate}</Text>
      </Pressable>
      {datePickerVisible && (
        <View style={{ position: 'absolute', height: '100%', width: '100%', bottom: -55 }}>
          <DatePicker
            onDateChange={date => handleConfirm(date)}
            options={{
              backgroundColor: '#14141D',
              textHeaderColor: '#FFCA3A',
              textDefaultColor: '#FFFFFF',
              selectedTextColor: '#101017',
              mainColor: '#FFCA3A',
              textSecondaryColor: '#FFCA3A',
              borderColor: '#3A3A54',
            }}
            current={getToday()}
            minimumDate="2020-02-17"
            selected={selectedDate}
            mode="calendar"
            style={{ borderRadius: 10, borderColor: '#3A3A54', borderWidth: 1 }}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    borderColor: '#F2F2F2',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 0,
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: Platform.OS === 'android' ? 12 : 15,
    fontSize: 16,
    fontFamily: 'Inter-300',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#c7c7c7',
    marginBottom: 6,
    fontFamily: 'Inter-400',
  },
  error: {
    fontSize: 12,
    color: '#f02d3a',
    bottom: 0,
    position: 'absolute',
    marginBottom: -20,
    fontFamily: 'Inter-300',
    letterSpacing: 0.5,
  },
  borderNone: {
    borderWidth: 0,
    backgroundColor: '#14141D',
  },
  titleText: {
    fontSize: 15,
  },
});
