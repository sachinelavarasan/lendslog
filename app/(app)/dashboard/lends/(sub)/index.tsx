import React from 'react';
import { Text } from 'react-native';

import HeaderWithCount from '@/components/HeaderWithCount';
import { ThemedView } from '@/components/ThemedView';

export default function index() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <HeaderWithCount title="All borrowers list" count={10} />
      <Text style={{ color: '#fff' }}>All Borrowers</Text>
    </ThemedView>
  );
}
