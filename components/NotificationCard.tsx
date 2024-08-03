import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { INotifications } from '@/utils/types/lends';

const NotificationCard = ({
  notification: { nt_pending_count, nt_text },
  type,
}: {
  notification: INotifications;
  type: string;
}) => {
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
        <View style={styles.structure}>
          <Text style={styles.subText}>
            {nt_text}
            <Text style={[styles.subText, { fontFamily: 'Inter-700' }]}>{nt_pending_count}</Text>
          </Text>
          {type === 'today' ? (
            <TouchableOpacity
              style={styles.view}
              onPress={() => {
                // setIsOpen(state => !state);
              }}>
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  subText: {
    color: '#C7C7C7',
    fontSize: 14,
    fontFamily: 'Inter-400',
  },
  subContent: { fontFamily: 'Inter-700', marginLeft: 4 },
  view: {
    backgroundColor: '#FFCA3A',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 6,
    opacity: 0.8,
  },
  viewText: { fontSize: 12, color: '#000000', fontFamily: 'Inter-600' },
  structure: {
    width:"100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
