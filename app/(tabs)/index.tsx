import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#0d0500', '#1a0a00', '#2a1200']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>BACKGAMMON</Text>
          <Text style={styles.subtitle}>ROYAL</Text>
          <View style={styles.dice}>
            <Text style={styles.diceText}>⚄ ⚅</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <GameModeButton
            label="SOLO"
            sublabel="vs Computer"
            emoji="🤖"
            onPress={() => router.push('/game/solo')}
            primary
          />
          <GameModeButton
            label="ONLINE"
            sublabel="Play with anyone"
            emoji="🌍"
            onPress={() => router.push('/game/online')}
          />
          <GameModeButton
            label="PLAY WITH FRIEND"
            sublabel="Private room"
            emoji="👥"
            onPress={() => router.push('/game/friend')}
          />
        </View>

        <View style={styles.bottomRow}>
          <IconButton emoji="🔊" label="Sound" onPress={() => {}} />
          <IconButton emoji="🎨" label="Themes" onPress={() => {}} />
          <IconButton emoji="❓" label="Help" onPress={() => router.push('/help')} />
          <IconButton emoji="⚙️" label="Settings" onPress={() => router.push('/settings')} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function GameModeButton({
  label,
  sublabel,
  emoji,
  onPress,
  primary = false,
}: {
  label: string;
  sublabel: string;
  emoji: string;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.gameModeBtn, primary && styles.gameModeBtnPrimary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.gameModeBtnEmoji}>{emoji}</Text>
      <View>
        <Text style={[styles.gameModeBtnLabel, primary && styles.gameModeBtnLabelPrimary]}>
          {label}
        </Text>
        <Text style={styles.gameModeBtnSublabel}>{sublabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

function IconButton({
  emoji,
  label,
  onPress,
}: {
  emoji: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.iconBtn} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.iconBtnEmoji}>{emoji}</Text>
      <Text style={styles.iconBtnLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24 },
  header: { alignItems: 'center', paddingTop: 40, paddingBottom: 32 },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.gold,
    letterSpacing: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
    color: COLORS.goldLight,
    letterSpacing: 16,
    marginTop: -4,
  },
  dice: { marginTop: 12 },
  diceText: { fontSize: 32 },
  menu: { gap: 14, flex: 1, justifyContent: 'center' },
  gameModeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gameModeBtnPrimary: {
    backgroundColor: COLORS.goldDark,
    borderColor: COLORS.gold,
  },
  gameModeBtnEmoji: { fontSize: 32 },
  gameModeBtnLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 1,
  },
  gameModeBtnLabelPrimary: { color: COLORS.background },
  gameModeBtnSublabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  iconBtn: { alignItems: 'center', gap: 4 },
  iconBtnEmoji: { fontSize: 26 },
  iconBtnLabel: { fontSize: 11, color: COLORS.textMuted },
});
