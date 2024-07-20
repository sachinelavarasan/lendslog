import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface LendsCardProps {
  ld_borrower_name: string;
  ld_payment_term: number;
  ld_lend_amount: number | string;
  ld_principal_repayment: number;
  ld_start_date: string;
}

const LendsCard = ({
  ld_borrower_name,
  ld_payment_term,
  ld_lend_amount,
  ld_principal_repayment,
  ld_start_date,
}: LendsCardProps) => {
  return (
    <View
      style={{
        backgroundColor: '#14141D',
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        padding: 20,
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
        <Text style={styles.name}>{ld_borrower_name}</Text>
        <View
          style={[
            styles.chip,
            {
              backgroundColor:
                ld_payment_term === 1 ? 'rgba(255,200,58,0.6)' : 'rgba(0,176,176,0.7)',
            },
          ]}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
              fontFamily: 'Inter-600',
            }}>
            {ld_payment_term == 1 ? 'Week' : 'Month'}
          </Text>
        </View>
      </View>
      <Text style={styles.subText}>
        Borrowed amount :<Text style={[styles.subText, { fontWeight: 700 }]}>{ld_lend_amount}</Text>
      </Text>
      <Text style={styles.subText}>
        To be paid :
        <Text style={[styles.subText, { fontWeight: 700 }]}>{ld_principal_repayment}</Text>
      </Text>
      <Text style={styles.subText}>
        Installment started on :
        <Text style={[styles.subText, { fontWeight: 700 }]}>{ld_start_date}</Text>
      </Text>
    </View>
  );
};

export default LendsCard;

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
});
