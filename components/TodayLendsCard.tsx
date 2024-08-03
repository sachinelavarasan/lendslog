import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TodayLends } from '@/utils/types/lends';

const TodayLendCard = ({
  ld_borrower_name,
  it_term_amount,
  pending_installments,
  total_pending_amount,
  ld_borrower_phoneno,
}: TodayLends) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View
      style={{
        backgroundColor: '#14141D',
        width: '100%',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: -4,
      }}>
      <View style={[styles.structure, {width: "85%"}]}>
        <Text style={styles.content}>
          <Text style={styles.subContent}>{ld_borrower_name} </Text>
          <Text>has </Text>
          <Text style={[styles.subContent, { color: '#00B0B0' }]}>
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
                <Text style={styles.subText}>{item.it_installment_date}</Text>
                <Text style={[styles.subText, { fontFamily: 'Inter-700' }]}>{item.it_term_amount}</Text>
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
    backgroundColor: '#00B0B0',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    opacity: 0.8,
  },
  viewText: { fontSize: 12, color: '#000000', fontFamily: 'Inter-600' },
  structure: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
