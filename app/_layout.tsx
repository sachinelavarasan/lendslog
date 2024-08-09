import 'react-native-reanimated';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';

import { store } from '@/redux/store';
import NetworkInfoModal from '@/components/NetworkInfoModal';
import { requestUserPermission } from '@/utils/notification-service';
import { useEffect } from 'react';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function RootLayout() {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <Provider store={store}>
      <Slot />
      <NetworkInfoModal />
    </Provider>
  );
}
