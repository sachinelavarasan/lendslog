import React from 'react';
import { StatusBar, Text } from 'react-native';

import SafeAreaViewComponent from '@/components/SafeAreaView';
import { ThemedView } from '@/components/ThemedView';


export default function Notification() {
  return (
    <SafeAreaViewComponent>
      <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 20 }}>
        <Text style={{ color: '#ffffff' }}>Notification</Text>
      </ThemedView>
    </SafeAreaViewComponent>
  );
}
