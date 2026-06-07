import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

export default function OnlineGameScreen() {
  return (
    <LinearGradient colors={['#0d0500', '#1a0a00']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.placeholder}>Online matchmaking — coming soon</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: COLORS.textMuted, fontSize: 16 },
});
