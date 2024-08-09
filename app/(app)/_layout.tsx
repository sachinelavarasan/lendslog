import 'react-native-reanimated';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar as ExpoStatus } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/useColorScheme';

//Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Inter-100': require('../../assets/fonts/Inter-Thin.ttf'),
    'Inter-200': require('../../assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-300': require('../../assets/fonts/Inter-Light.ttf'),
    'Inter-400': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-500': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-600': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-700': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-800': require('../../assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-900': require('../../assets/fonts/Inter-Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ExpoStatus backgroundColor="rgba(255,200,58,0.6)" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
