import { useRouter } from 'expo-router';
import { StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';

import { auth } from '@/firebaseConfig';

import { ThemedView } from '@/components/ThemedView';
import SafeAreaViewComponent from '@/components/SafeAreaView';

export default function AddLendsLog() {
  const router = useRouter();
  const signOut = () => {
    auth.signOut();
    router.replace('/(auth)/login');
  };
  return (
    <SafeAreaViewComponent>
      <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <Text style={{ color: '#D9D9D9' }}>Explore yourself 😍</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            signOut();
          }}>
          <Text style={{ color: '#14141D' }}>Sign Out</Text>
        </TouchableOpacity>
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
