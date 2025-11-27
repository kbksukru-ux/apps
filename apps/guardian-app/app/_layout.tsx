import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useColorScheme } from '@/components/useColorScheme';
import { AppProviders } from '@/providers/AppProviders';
import i18n from '@/lib/i18n';
import { initOfflineTables } from '@/lib/offline';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await FontAwesome.loadFont();
      try {
        await initOfflineTables();
      } catch (e) {
        console.warn('Offline init failed:', e);
      }
      setReady(true);
      SplashScreen.hideAsync();
    })();
  }, []);

  if (!ready) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <AppProviders>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ResponsiveContainer>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
          </ResponsiveContainer>
        </ThemeProvider>
      </AppProviders>
    </I18nextProvider>
  );
}
