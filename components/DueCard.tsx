import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import CustomCheckBox from './CustomCheckBox';

import { useAppDispatch } from '@/redux/hooks';
import { updateInstallment } from '@/redux/slices/lends/lendsSlice';

import { IinstallmentTimelines } from '@/utils/types/lends';

const DueCard = ({
  it_id,
  it_lend_id, // lends id
  it_installment_date,
  it_installement_status,
  it_order,
  it_created_at,
  it_updated_at,
  it_is_deleted,
  it_term_amount,
}: IinstallmentTimelines) => {
  const [isChecked, setIsChecked] = useState<number>(0);
  const dispatch = useAppDispatch();
  const onUpdate = () => {
    console.log(isChecked)
    dispatch(
      updateInstallment([isChecked], it_lend_id, () => {
        Toast.show({
          type: 'success',
          text1: 'Installment pending paid status updated successfully',
        });
        setIsChecked(0)
      })
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#323448',
        width: '100%',
        borderRadius: 6,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: -4,
        display: 'flex',
        flexDirection: 'row',
      }}>
      {it_installement_status == 1 ? (
        <View>
          <CustomCheckBox
            // label={it_installment_date}
            fillColor="rgba(255, 200, 58, 0.8)"
            onChange={checked => {
              if (checked) {
                setIsChecked(it_id);
              } else {
                setIsChecked(0);
              }
            }}
            isChecked={isChecked === it_id}
            size={20}
          />
        </View>
      ) : null}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: it_installement_status == 2 ? '100%' : '90%',
        }}>
        <View>
          <Text style={styles.subText}>
            Date of Payment : <Text style={styles.name}>{it_installment_date}</Text>
          </Text>
          <Text style={styles.subText}>
            Due amount : <Text style={styles.name}>{it_term_amount}</Text>
          </Text>
          {isChecked == it_id ? (
            <TouchableOpacity
              style={styles.updateInstallment}
              disabled={!isChecked}
              onPress={() => {
                Alert.alert('Update Installment', 'Are you sure you want to update this installment payment status ?', [
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
        <Text style={[it_installement_status === 1 ? styles.pendingStyle : styles.paidStyle]}>
          {it_installement_status === 1 ? 'Pending' : 'Paid'}
        </Text>
      </View>
    </View>
  );
};

export default DueCard;

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-700',
    maxWidth: 250,
  },
  subText: {
    color: '#C7C7C7',
    fontSize: 14,
    fontFamily: 'Inter-400',
  },
  paidStyle: {
    backgroundColor: 'rgba(111, 255, 98, 0.09)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: '#96FF71',
    fontSize: 12,
    fontFamily: 'Inter-500',
  },
  pendingStyle: {
    backgroundColor: 'rgba(255, 87, 87, 0.16)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: '#F75353',
    fontSize: 12,
    fontFamily: 'Inter-500',
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
