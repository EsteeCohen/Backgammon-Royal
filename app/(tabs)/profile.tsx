import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

export default function ProfileScreen() {
  return (
    <LinearGradient colors={['#0d0500', '#1a0a00', '#2a1200']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>PROFILE</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>👤</Text>
          <Text style={styles.placeholderLabel}>Sign in with Game Center to see your stats</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24 },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.gold, letterSpacing: 4, textAlign: 'center', paddingTop: 24, paddingBottom: 20 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  placeholderText: { fontSize: 64 },
  placeholderLabel: { fontSize: 16, color: COLORS.textMuted, textAlign: 'center', maxWidth: 260 },
});
