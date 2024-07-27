import { IinstallmentTimelines } from '@/utils/types/lends';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  return (
    <View
      style={{
        backgroundColor: '#14141D',
        width: '100%',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: -4,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.name}>{it_installment_date}</Text>

        <Text style={[it_installement_status === 1 ? styles.pendingStyle : styles.paidStyle]}>
          {it_installement_status === 1 ? 'Pending' : 'Paid'}
        </Text>
      </View>
      <Text style={styles.subText}>
        Due amount : <Text style={[styles.subText, { fontWeight: 700 }]}>{it_term_amount}</Text>
      </Text>
    </View>
  );
};

export default DueCard;

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-700',
    maxWidth: 250,
  },
  subText: {
    color: '#C7C7C7',
    fontSize: 14,
    fontFamily: 'Inter-400',
    marginTop: 8,
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
});
