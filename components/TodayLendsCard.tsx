import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import CustomCheckBox from './CustomCheckBox';

import { TodayLends } from '@/utils/types/lends';

import { useAppDispatch } from '@/redux/hooks';
import { payInstallment } from '@/redux/slices/lends/lendsSlice';

const TodayLendCard = ({
  ld_borrower_name,
  it_term_amount,
  pending_installments,
  total_pending_amount,
  ld_borrower_phoneno,
  ld_id,
}: TodayLends) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const onUpdate = () => {
    dispatch(
      payInstallment(isChecked, ld_id, () => {
        Toast.show({
          type: 'success',
          text1: 'Installment pending paid status updated successfully',
        });
      })
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#1C1C29',
        width: '100%',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: -4,
      }}>
      <View style={[styles.structure, { width: '85%' }]}>
        <Text style={styles.content}>
          <Text style={styles.subContent}>{ld_borrower_name} </Text>
          <Text>has </Text>
          <Text style={[styles.subContent, { color: 'rgba(255,200,58,0.78)' }]}>
            {pending_installments.length}{' '}
          </Text>
          <Text>Pending payments till now</Text>
        </Text>
      </View>
      <View style={styles.structure}>
        <Text style={styles.subText}>
          Contact Number :{' '}
          <Text style={[styles.subText, { fontFamily: 'Inter-700' }]}>{ld_borrower_phoneno}</Text>
        </Text>
        <TouchableOpacity
          style={styles.view}
          onPress={() => {
            setIsOpen(state => !state);
          }}>
          <Text style={styles.viewText}>{!isOpen ? 'View' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.structure}>
        <Text style={styles.subText}>
          Due amount : <Text style={[styles.subText, { fontFamily: 'Inter-700' }]}>{it_term_amount}</Text>
        </Text>
      </View> */}
      {isOpen && pending_installments.length ? (
        <View style={{ borderTopWidth: 0.2, borderTopColor: '#ffffff', marginTop: 20 }}>
          <Text style={[styles.subText, { color: '#ffffff' }]}>Pending Installment Dates</Text>
          {pending_installments.map((item, index) => (
            <View key={`${item.it_id}` + `${index}`} style={{ marginTop: 4 }}>
              <View style={styles.structure}>
                <View style={{ width: '50%' }}>
                  <CustomCheckBox
                    label={item.it_installment_date}
                    fillColor="rgba(255, 200, 58, 0.8)"
                    onChange={() => {
                      setIsChecked(state => [...state, item.it_id]);
                      // onPress({ it_id: item.it_id, ld_id: ld_id });
                    }}
                    isChecked={isChecked.includes(item.it_id)}
                    size={20}
                  />
                </View>
                <Text style={[styles.subText, { fontFamily: 'Inter-700' }]}>
                  {item.it_term_amount}
                </Text>
              </View>
            </View>
          ))}

          <View
            style={[
              styles.structure,
              { borderTopWidth: 0.2, borderTopColor: '#ffffff', marginTop: 12 },
            ]}>
            <Text style={styles.subText}>Total pending amount: </Text>
            <Text style={[styles.subText, { fontFamily: 'Inter-700', color: '#FFCA3A' }]}>
              {total_pending_amount}
            </Text>
          </View>
          {isChecked.length ? (
            <TouchableOpacity
              style={styles.updateInstallment}
              disabled={!isChecked.length}
              onPress={() => {
                Alert.alert('Update Installments', `Updating this will change the selected installment's status from pending to paid.`,[
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Update',
                    style: 'default',
                    onPress: () => {
                      onUpdate();
                    },
                  },
                ]);
              }}>
              <Text style={styles.update}>Update</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default TodayLendCard;

const styles = StyleSheet.create({
  content: {
    color: '#c7c7c7',
    fontSize: 16,
    fontFamily: 'Inter-400',
  },
  subText: {
    color: '#C7C7C7',
    fontSize: 14,
    fontFamily: 'Inter-400',
    marginTop: 8,
  },

  subContent: { fontFamily: 'Inter-700', marginLeft: 4 },
  view: {
    backgroundColor: '#323448',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    opacity: 0.8,
  },
  viewText: { fontSize: 12, color: '#dcdcdc', fontFamily: 'Inter-600' },
  structure: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updateInstallment: {
    backgroundColor: '#FFCA3A',
    borderRadius: 4,
    padding: 8,
    opacity: 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  update: {
    color: '#1C1C29',
    fontSize: 14,
    fontFamily: 'Inter-700',
  },
});
