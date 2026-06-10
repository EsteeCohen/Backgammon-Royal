import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

export default function FriendGameScreen() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [mode, setMode] = useState<'menu' | 'create' | 'join'>('menu');

  return (
    <LinearGradient colors={['#0d0500', '#1a0a00', '#2a1200']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>PLAY WITH FRIEND</Text>

        {mode === 'menu' && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.btn} onPress={() => setMode('create')}>
              <Text style={styles.btnEmoji}>🚪</Text>
              <Text style={styles.btnLabel}>Create Room</Text>
              <Text style={styles.btnSub}>Share the code with your friend</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => setMode('join')}>
              <Text style={styles.btnEmoji}>🔑</Text>
              <Text style={styles.btnLabel}>Join Room</Text>
              <Text style={styles.btnSub}>Enter a room code to join</Text>
            </TouchableOpacity>
          </View>
        )}

        {mode === 'create' && (
          <View style={styles.codeContainer}>
            <Text style={styles.label}>Your room code:</Text>
            <Text style={styles.code}>ROYAL42</Text>
            <Text style={styles.hint}>Share this code with your friend</Text>
            <Text style={styles.waiting}>Waiting for opponent...</Text>
          </View>
        )}

        {mode === 'join' && (
          <View style={styles.joinContainer}>
            <Text style={styles.label}>Enter room code:</Text>
            <TextInput
              style={styles.input}
              value={roomCode}
              onChangeText={(t) => setRoomCode(t.toUpperCase())}
              placeholder="e.g. ROYAL42"
              placeholderTextColor={COLORS.textMuted}
              maxLength={8}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={[styles.joinBtn, !roomCode && styles.joinBtnDisabled]}
              disabled={!roomCode}
              onPress={() => router.push(`/game/room/${roomCode}`)}
            >
              <Text style={styles.joinBtnText}>JOIN</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24 },
  title: { fontSize: 22, fontWeight: '900', color: COLORS.gold, letterSpacing: 4, textAlign: 'center', paddingTop: 24, paddingBottom: 32 },
  menu: { gap: 16 },
  btn: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', gap: 8 },
  btnEmoji: { fontSize: 40 },
  btnLabel: { fontSize: 18, fontWeight: '700', color: COLORS.text, letterSpacing: 1 },
  btnSub: { fontSize: 13, color: COLORS.textMuted },
  codeContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  label: { fontSize: 16, color: COLORS.textMuted },
  code: { fontSize: 48, fontWeight: '900', color: COLORS.gold, letterSpacing: 8 },
  hint: { fontSize: 14, color: COLORS.textMuted },
  waiting: { fontSize: 14, color: COLORS.goldLight, marginTop: 24 },
  joinContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, width: '100%' },
  input: { width: '100%', backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, fontSize: 28, fontWeight: '700', color: COLORS.gold, letterSpacing: 8, textAlign: 'center', borderWidth: 1, borderColor: COLORS.border },
  joinBtn: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 16, paddingHorizontal: 48 },
  joinBtnDisabled: { opacity: 0.4 },
  joinBtnText: { fontSize: 16, fontWeight: '900', color: COLORS.background, letterSpacing: 2 },
});
