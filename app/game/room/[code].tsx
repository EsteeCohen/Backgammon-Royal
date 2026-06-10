import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

export default function RoomGameScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();

  return (
    <LinearGradient colors={['#0d0500', '#1a0a00']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.code}>Room: {code}</Text>
        <Text style={styles.placeholder}>Game board — coming soon</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  code: { color: COLORS.gold, fontSize: 20, fontWeight: '700', letterSpacing: 4 },
  placeholder: { color: COLORS.textMuted, fontSize: 16 },
});
