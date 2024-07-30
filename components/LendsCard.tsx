import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export interface LendsCardProps {
  ld_id: number;
  ld_borrower_name: string;
  ld_payment_term: number;
  ld_lend_amount: number | string;
  ld_principal_repayment: number;
  ld_start_date: string;
  // ld_paid_amount: number;
  // ld_pending_amount: number;
  ld_paid_weeks: number;
  ld_pending_weeks: number;
  ld_total_weeks_or_month: number;
  ld_interest_amount: number;
}

const LendsCard = ({
  ld_id,
  ld_borrower_name,
  ld_payment_term,
  ld_lend_amount,
  ld_principal_repayment,
  ld_start_date,
  // ld_paid_amount,
  // ld_pending_amount,
  ld_paid_weeks,
  ld_pending_weeks,
  ld_total_weeks_or_month,
  ld_interest_amount,
}: LendsCardProps) => {
  return (
    <View
      style={{
        backgroundColor: '#14141D',
        width: '100%',
        borderRadius: 10,
        marginTop: 20,
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
      <View style={styles.subTextContainer}>
        <Text style={[styles.subText, { marginRight: 6 }]}>Borrowed amount :</Text>
        <Text style={[styles.subText, { fontWeight: 700 }]}>{ld_lend_amount}</Text>
      </View>
      <View style={styles.subTextContainer}>
        <Text style={[styles.subText, { marginRight: 6 }]}>To be paid :</Text>
        <Text style={[styles.subText, { fontWeight: 700 }]}>
          {(Number(ld_principal_repayment) + Number(ld_interest_amount)).toFixed(2)}
        </Text>
      </View>
      {/* <View style={styles.subTextContainer}>
        <Text style={[styles.subText, { marginRight: 6 }]}>Paid amount :</Text>
        <Text style={[styles.subText, { fontWeight: 700 }]}>{ld_paid_amount}</Text>
      </View>
      <View style={styles.subTextContainer}>
        <Text style={[styles.subText, { marginRight: 6 }]}>Pending amount :</Text>
        <Text style={[styles.subText, { fontWeight: 700 }]}>{ld_pending_amount}</Text>
      </View> */}
      <View style={styles.subTextContainer}>
        <Text style={[styles.subText, { marginRight: 6 }]}>Installment started on :</Text>
        <Text style={[styles.subText, { fontWeight: 700 }]}>{ld_start_date}</Text>
      </View>
      <View style={styles.weeksStyles}>
        <View style={styles.weekSubContainer}>
          <Text style={[styles.subText, { marginRight: 6, color: 'rgba(255, 200, 58, 0.84)' }]}>
            Paid weeks :
          </Text>
          <Text style={[styles.subText, { fontWeight: 700, color: 'rgba(255, 200, 58, 0.84)' }]}>
            {ld_paid_weeks}/{ld_total_weeks_or_month}
          </Text>
        </View>
        <View style={styles.weekSubContainer}>
          <Text style={[styles.subText, { marginRight: 6, color: 'rgba(0, 176, 176, 1)' }]}>
            Pending weeks :
          </Text>
          <Text style={[styles.subText, { fontWeight: 700, color: 'rgba(0, 176, 176, 1)' }]}>
            {ld_pending_weeks}/{ld_total_weeks_or_month}
          </Text>
        </View>
      </View>
      <View style={styles.lastContainer}>
        {ld_paid_weeks == ld_total_weeks_or_month ? (
          <Text style={styles.closedStyle}>Closed</Text>
        ) : (
          <Text style={styles.pendingStyle}>Pending</Text>
        )}
        <Link
          href={{
            pathname: '/dashboard/lends/[id]',
            params: { id: ld_id },
          }}
          asChild>
          <Pressable>
            <Image
              source={require('@/assets/icons/next.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
        </Link>
      </View>
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
  },
  weeksStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  subTextTitle: {
    color: '#C7C7C7',
    fontSize: 14,
    fontFamily: 'Inter-400',
    marginTop: 8,
  },
  subTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  weekSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 18,
    width: 18,
    marginRight: -5,
  },
  lastContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  closedStyle: {
    backgroundColor: 'rgba(111, 255, 98, 0.09)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: '#96FF71',
    fontSize: 14,
    fontFamily: 'Inter-500',
  },
  pendingStyle: {
    backgroundColor: 'rgba(255, 87, 87, 0.16)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: '#F75353',
    fontSize: 14,
    fontFamily: 'Inter-500',
  },
});
