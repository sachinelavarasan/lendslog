import { FirebaseContext } from '@/contexts/firebase-context';
import { useSegments, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const StartPage = () => {
  const { user } = useContext(FirebaseContext);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace('dashboard');
    } else if (!user) {
      router.replace('/(auth)/login');
    }
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#FFCA3A" />
    </View>
  );
};

export default StartPage;
