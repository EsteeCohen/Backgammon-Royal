import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

type Tab = 'rating' | 'points';

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('rating');

  return (
    <LinearGradient colors={['#0d0500', '#1a0a00', '#2a1200']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>LEADERBOARD</Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'rating' && styles.tabActive]}
            onPress={() => setActiveTab('rating')}
          >
            <Text style={[styles.tabText, activeTab === 'rating' && styles.tabTextActive]}>
              ELO RATING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'points' && styles.tabActive]}
            onPress={() => setActiveTab('points')}
          >
            <Text style={[styles.tabText, activeTab === 'points' && styles.tabTextActive]}>
              POINTS
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>🏆</Text>
          <Text style={styles.placeholderLabel}>Leaderboard coming soon</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24 },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.gold, letterSpacing: 4, textAlign: 'center', paddingTop: 24, paddingBottom: 20 },
  tabs: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 12, padding: 4, marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 9 },
  tabActive: { backgroundColor: COLORS.gold },
  tabText: { fontSize: 13, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 1 },
  tabTextActive: { color: COLORS.background },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  placeholderText: { fontSize: 64 },
  placeholderLabel: { fontSize: 16, color: COLORS.textMuted },
});
