import 'react-native-reanimated';

import { Slot } from 'expo-router';
import { FirebaseProvider } from '@/contexts/firebase-context';

export default function RootLayout() {
  return (
    <FirebaseProvider>
      <Slot />
    </FirebaseProvider>
  );
}
