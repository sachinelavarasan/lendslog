import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const AddBorrower = ({ onSubmit }: any) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [type, setType] = useState('');
  return (
    <View>
      <Text style={styles.label}>Enter Title</Text>
      <TextInput style={styles.input} value={name} onChangeText={text => setName(text)} />
      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        style={styles.input}
        value={borrowAmount}
        onChangeText={text => setBorrowAmount(text)}
      />
      <Text style={styles.label}>Enter Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={text => setType(text)} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSubmit(name, borrowAmount, type);
            router.replace('/dashboard');
          }}>
          <Text style={{ color: '#FFFFFF', fontFamily: 'Inter-600', fontSize: 14 }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#14141D',
    fontSize: 16,
    marginBottom: 15,
    padding: 5,
    margin: 5,
    borderRadius: 6,
    color: '#FFFFFF',
    fontFamily: 'Inter-400',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
    color: '#F2F2F2',
    fontFamily: 'Inter-600',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 176, 176, 0.6902)',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '30%',
  },
});

export default AddBorrower;
