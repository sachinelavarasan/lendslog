import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

export default function CustomDatePicker({
  onDateChange,
  value = '',
  borderLess = true,
  label,
  placeholder,
  error,
}: {
  onDateChange: (date: string) => void;
  value?: string;
  borderLess?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
}) {
  const [selectedDate, setSelectedDate] = useState(value);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleConfirm = (date: string) => {
    if (date) {
      setSelectedDate(formatDate(date));
      onDateChange(formatDate(date));
    }
    toggleDatePicker();
  };
  function formatDate(date: string) {
    if(!date) return '';
    const selectedDate = date.split('/').join('-');
    return getFormatedDate(new Date(selectedDate), 'YYYY-MM-DD');
  }
  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        onPress={() => {
          toggleDatePicker();
        }}
        style={[styles.inputContainer, borderLess ? styles.borderNone : null, styles.innerView]}>
        {selectedDate ? (
          <Text style={styles.input}>{getFormatedDate(new Date(selectedDate), 'DD-MM-YYYY')}</Text>
        ) : (
          <Text style={[styles.input, styles.placeholder]}>{placeholder}</Text>
        )}
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {datePickerVisible && (
        <View style={{ bottom: 10 }}>
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
            current={selectedDate}
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
    marginTop: 5,
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
  placeholder: {
    color: '#999999',
  },
});
