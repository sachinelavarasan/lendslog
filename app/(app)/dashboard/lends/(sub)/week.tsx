import React from 'react';
import { Text } from 'react-native';

import HeaderWithCount from '@/components/HeaderWithCount';
import { ThemedView } from '@/components/ThemedView';

export default function week() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <HeaderWithCount title="Week borrowers list" count={44} countText='borrowers'/>
      <Text style={{ color: '#fff' }}>Week</Text>
    </ThemedView>
  );
}
