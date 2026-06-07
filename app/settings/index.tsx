import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState, type ReactNode } from 'react';
import { COLORS } from '@/constants/colors';

type SoundMode = 'full' | 'vibration' | 'silent';

export default function SettingsScreen() {
  const [soundMode, setSoundMode] = useState<SoundMode>('full');
  const [autoplay, setAutoplay] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [doublingEnabled, setDoublingEnabled] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <SettingsGroup title="Sound">
        <SoundSelector value={soundMode} onChange={setSoundMode} />
      </SettingsGroup>

      <SettingsGroup title="Gameplay">
        <SettingsRow
          label="Autoplay Forced Moves"
          sublabel="Automatically play when only one legal move exists"
          right={<Switch value={autoplay} onValueChange={setAutoplay} trackColor={{ true: COLORS.gold }} />}
        />
        <SettingsRow
          label="Doubling Cube (Online)"
          sublabel="Allow X2 offers in online games"
          right={<Switch value={doublingEnabled} onValueChange={setDoublingEnabled} trackColor={{ true: COLORS.gold }} />}
        />
      </SettingsGroup>

      <SettingsGroup title="Profile">
        <SettingsRow
          label="Show Rating"
          sublabel="Display your ELO rating on the leaderboard"
          right={<Switch value={showRating} onValueChange={setShowRating} trackColor={{ true: COLORS.gold }} />}
        />
      </SettingsGroup>

      <SettingsGroup title="Purchase">
        <TouchableOpacity style={styles.removeAdsBtn}>
          <Text style={styles.removeAdsBtnText}>⭐ Remove Ads — $2.99</Text>
          <Text style={styles.removeAdsSub}>One-time purchase, forever ad-free</Text>
        </TouchableOpacity>
      </SettingsGroup>

      <SettingsGroup title="About">
        <SettingsRow label="Version" right={<Text style={styles.valueText}>1.0.0</Text>} />
        <SettingsRow label="Privacy Policy" right={<Text style={styles.arrowText}>›</Text>} />
        <SettingsRow label="Terms of Use" right={<Text style={styles.arrowText}>›</Text>} />
        <SettingsRow label="Restore Purchases" right={<Text style={styles.arrowText}>›</Text>} />
      </SettingsGroup>

    </ScrollView>
  );
}

function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={groupStyles.container}>
      <Text style={groupStyles.title}>{title.toUpperCase()}</Text>
      <View style={groupStyles.card}>{children}</View>
    </View>
  );
}

function SettingsRow({ label, sublabel, right }: { label: string; sublabel?: string; right: ReactNode }) {
  return (
    <View style={rowStyles.row}>
      <View style={rowStyles.left}>
        <Text style={rowStyles.label}>{label}</Text>
        {sublabel && <Text style={rowStyles.sublabel}>{sublabel}</Text>}
      </View>
      {right}
    </View>
  );
}

function SoundSelector({ value, onChange }: { value: SoundMode; onChange: (v: SoundMode) => void }) {
  const options: { id: SoundMode; label: string; emoji: string }[] = [
    { id: 'full', label: 'Full Sound', emoji: '🔊' },
    { id: 'vibration', label: 'Vibration Only', emoji: '📳' },
    { id: 'silent', label: 'Silent', emoji: '🔇' },
  ];
  return (
    <View style={soundStyles.container}>
      {options.map((o) => (
        <TouchableOpacity
          key={o.id}
          style={[soundStyles.option, value === o.id && soundStyles.optionActive]}
          onPress={() => onChange(o.id)}
        >
          <Text style={soundStyles.optionEmoji}>{o.emoji}</Text>
          <Text style={[soundStyles.optionLabel, value === o.id && soundStyles.optionLabelActive]}>
            {o.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0a00' },
  content: { padding: 20, paddingBottom: 60, gap: 24 },
  removeAdsBtn: { backgroundColor: COLORS.goldDark, borderRadius: 12, padding: 18, alignItems: 'center', gap: 4 },
  removeAdsBtnText: { fontSize: 16, fontWeight: '800', color: '#1a0a00', letterSpacing: 1 },
  removeAdsSub: { fontSize: 12, color: '#1a0a00', opacity: 0.7 },
  valueText: { fontSize: 14, color: COLORS.textMuted },
  arrowText: { fontSize: 20, color: COLORS.textMuted },
});

const groupStyles = StyleSheet.create({
  container: { gap: 8 },
  title: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 2, paddingLeft: 4 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
});

const rowStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  left: { flex: 1, gap: 2 },
  label: { fontSize: 15, color: COLORS.text },
  sublabel: { fontSize: 12, color: COLORS.textMuted },
});

const soundStyles = StyleSheet.create({
  container: { flexDirection: 'row' },
  option: { flex: 1, alignItems: 'center', paddingVertical: 14, gap: 4 },
  optionActive: { backgroundColor: COLORS.goldDark },
  optionEmoji: { fontSize: 24 },
  optionLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },
  optionLabelActive: { color: '#1a0a00' },
});
