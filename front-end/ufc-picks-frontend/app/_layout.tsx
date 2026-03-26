import { COLORS } from '@/theme/colors';
import { Stack } from 'expo-router';;
import { View } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <Stack screenOptions={{
      headerShown: true,
      contentStyle: {
        backgroundColor: "#1b1c1d4b"
      },
      headerStyle: {
        backgroundColor: "#0F1115",
      },
      headerTitleStyle: {
        fontWeight: 800,
        color: COLORS.goldText,
      }
    }}>
      <Stack.Screen name='(tabs)' options={{
        headerShown: false,
        headerTitle: "EVENTS"
      }} />
      <Stack.Screen name='event/[eventId]'
        options={{
          headerShown: true,
          title: "FIGHT CARD",
        }} />
    </Stack>

  );
}
