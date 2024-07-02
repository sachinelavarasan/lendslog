import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface HeaderWithCountProps {
  title: string;
  count?: number;
}

const HeaderWithCount = ({ title, count }: HeaderWithCountProps) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
      <Text style={[styles.header]}>{title}</Text>
      {count && (
        <View style={styles.countSpan}>
          <Text style={[styles.count]}>{count}</Text>
        </View>
      )}
    </View>
  );
};

export default HeaderWithCount;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Avenir-Black',
    textTransform: 'capitalize',
    fontWeight: '800',
  },
  count: {
    fontWeight: '800',
    fontSize: 14,
    color: '#FFFFFF',
    padding: 5,
  },
  countSpan: {
    backgroundColor: 'rgba(255,200,58,0.78)',
    borderRadius: 20,
    marginLeft:10
  },
});
