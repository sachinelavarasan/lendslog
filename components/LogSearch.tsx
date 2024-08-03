import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import SearchBar from '@/components/SearchBar';

export default function Lends() {
  const [searchPhrase, setSearchPhrase] = useState('');
  return (
    <View style={{ marginTop: Platform.OS == 'android' ? 25 : 5 }}>
      <SearchBar
        searchPhrase={searchPhrase}
        onChange={(e: any) => {
          setSearchPhrase(e);
        }}
        onClick={(searchPhrase: string) => {
          if (searchPhrase.trim().length) {
          }
        }}
        onClose={() => {
          setSearchPhrase('');
        }}
      />
    </View>
  );
}
