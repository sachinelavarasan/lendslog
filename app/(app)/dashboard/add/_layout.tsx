import { useRouter } from 'expo-router';
import { StyleSheet, Text, StatusBar, TouchableOpacity, View } from 'react-native';

import { auth } from '@/firebaseConfig';

import { ThemedView } from '@/components/ThemedView';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import AddBorrower from './add';

import { useAppDispatch } from '@/redux/store';
import { addBorrower } from '@/redux/borrowers/borrowersSlice';

export default function AddLendsLog() {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
        <View style={styles.layout}>
          <AddBorrower
            onSubmit={(name: string, borrowAmount: string, type: string) => {
              dispatch(addBorrower({ name: name, amount: borrowAmount, type: type  }));
            }}
          />
        </View>
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
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  layout: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
