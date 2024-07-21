import { createContext, useEffect } from 'react';
import { requestUserPermission } from '@/utils/notification-service';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { useRouter } from 'expo-router';

export const FirebaseContext = createContext(null);

type Props = { children: React.ReactNode };

export const FirebaseProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    requestUserPermission();
  }, []);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  useEffect(() => {
    // Handle user clicking on a notification and open the screen
    const handleNotificationClick = async (response: any) => {
      console.log('🚀 ~ messaging ~ handleNotificationClick:', response);
      const screen = response?.notification?.request?.content?.data?.screen;
      console.log(response?.notification?.request?.content?.data);
      if (screen) {
        router.navigate(screen);
      }
    };

    // Listen for user clicking on a notification
    const notificationClickSubscription =
      Notifications.addNotificationResponseReceivedListener(handleNotificationClick);

    // Handle user opening the app from a notification (when the app is in the background)
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('🚀 ~ messaging ~ onNotificationOpenedApp:', remoteMessage);
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage?.data?.screen,
        router
      );
      if (remoteMessage?.data?.screen) {
        router.navigate(`${remoteMessage.data.screen}`);
      }
    });

    // Check if the app was opened from a notification (when the app was completely quit)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('🚀 ~ .then ~ getInitialNotification:', remoteMessage);
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage?.notification
          );
          if (remoteMessage?.data?.screen) {
            router.navigate(`${remoteMessage.data.screen}`);
          }
        }
      });

    // Handle push notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      const notification = {
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        data: remoteMessage.data, // optional data payload
      };

      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    });

    // Handle push notifications when the app is in the foreground
    const handlePushNotification = async (remoteMessage: any) => {
      console.log(remoteMessage);
      const notification = {
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        data: remoteMessage?.data, // optional data payload
      };

      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    };

    // Listen for push notifications when the app is in the foreground
    const unsubscribe = messaging().onMessage(handlePushNotification);

    // Clean up the event listeners
    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };
  }, []);

  return <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>;
};
