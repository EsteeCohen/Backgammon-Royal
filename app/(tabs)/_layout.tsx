import { Tabs } from 'expo-router';
import { Platform, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: Platform.OS === 'ios' ? 84 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Play',
          tabBarIcon: ({ color }) => <TabIcon name="🎲" active={color === COLORS.gold} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => <TabIcon name="🏆" active={color === COLORS.gold} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon name="👤" active={color === COLORS.gold} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ name, active }: { name: string; active: boolean }) {
  return (
    <Text style={active ? styles.iconActive : styles.iconInactive}>{name}</Text>
  );
}

const styles = StyleSheet.create({
  iconActive: { fontSize: 22, opacity: 1 },
  iconInactive: { fontSize: 22, opacity: 0.5 },
});
