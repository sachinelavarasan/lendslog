import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { auth } from '@/firebaseConfig';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import HeaderWithCount from '@/components/HeaderWithCount';

export default function Lends() {
  const router = useRouter();
  const [searchPhrase, setSearchPhrase] = useState('');
  const signOut = () => {
    auth.signOut();
    router.replace('/(auth)/login');
  };
  return (
    <SafeAreaViewComponent style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 20 }}>
        <View>
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
        <HeaderWithCount
          title="Week borrowers list"
          count={10}
        />
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            signOut();
          }}>
          <Text style={{ color: '#14141D' }}>Sign Out</Text>
        </TouchableOpacity> */}
      </ThemedView>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFCA3A',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
});
