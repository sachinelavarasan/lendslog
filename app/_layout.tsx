import 'react-native-reanimated';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';

// import { FirebaseProvider } from '@/contexts/firebase-context';
import { store } from '@/redux/store';

export default function RootLayout() {
  return (
    // <FirebaseProvider>
      <Provider store={store}>
        <Slot />
      </Provider>
    // </FirebaseProvider>
  );
}
