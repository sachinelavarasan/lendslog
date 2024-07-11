import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
interface IDueCardProps {
  data: {
    name: string;
    type: string;
    amount: number;
  };
}

const DueCard = ({ data }: IDueCardProps) => {
  return (
    <View
      style={{
        backgroundColor: '#14141D',
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
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
        <Text style={styles.name}>{data.name}</Text>
        <View
          style={[
            styles.chip,
            {
              backgroundColor:
                data.type === 'Week' ? 'rgba(255,200,58,0.6)' : 'rgba(0,176,176,0.7)',
            },
          ]}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
              fontFamily: 'Inter-600',
            }}>
            {data.type}
          </Text>
        </View>
      </View>
      <Text style={styles.subText}>
        Due amount : <Text style={[styles.subText, { fontWeight: 700 }]}>{data.amount}</Text>
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
});
