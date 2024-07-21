import 'react-native-reanimated';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';

import { FirebaseProvider } from '@/contexts/firebase-context';
import { store } from '@/redux/store';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function RootLayout() {
  return (
    //<FirebaseProvider>
      <Provider store={store}>
        <Slot />
      </Provider>
    //</FirebaseProvider>
  );
}
