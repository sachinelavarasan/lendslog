import React from 'react';
import { Text } from 'react-native';

import HeaderWithCount from '@/components/HeaderWithCount';
import { ThemedView } from '@/components/ThemedView';

export default function month() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <HeaderWithCount title="Month borrowers list" count={56} countText='borrowers'/>
      <Text style={{ color: '#fff' }}>Month</Text>
    </ThemedView>
  );
}
