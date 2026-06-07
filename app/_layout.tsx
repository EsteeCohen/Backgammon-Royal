import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="game/solo" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="game/online" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="game/friend" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="game/room/[code]" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="help/index" options={{ presentation: 'modal', headerShown: true, headerTitle: 'Help & Tutorial', headerStyle: { backgroundColor: '#1a0a00' }, headerTintColor: '#d4a04a' }} />
        <Stack.Screen name="settings/index" options={{ presentation: 'modal', headerShown: true, headerTitle: 'Settings', headerStyle: { backgroundColor: '#1a0a00' }, headerTintColor: '#d4a04a' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
