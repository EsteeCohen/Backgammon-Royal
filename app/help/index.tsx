import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, type ReactNode } from 'react';
import { COLORS } from '@/constants/colors';

type Section =
  | 'how_to_play'
  | 'game_modes'
  | 'online_rules'
  | 'elo'
  | 'playing'
  | 'doubling_cube'
  | 'faq';

const SECTIONS: { id: Section; label: string; emoji: string }[] = [
  { id: 'how_to_play', label: 'How to Play', emoji: '📖' },
  { id: 'game_modes', label: 'Game Modes', emoji: '🎮' },
  { id: 'online_rules', label: 'Online Rules', emoji: '🌍' },
  { id: 'elo', label: 'ELO Rating', emoji: '⭐' },
  { id: 'playing', label: 'Playing the Game', emoji: '🎲' },
  { id: 'doubling_cube', label: 'Doubling Cube', emoji: '×2' },
  { id: 'faq', label: 'FAQ', emoji: '❓' },
];

export default function HelpScreen() {
  const [activeSection, setActiveSection] = useState<Section>('how_to_play');

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={styles.tabsContent}>
        {SECTIONS.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={[styles.tab, activeSection === s.id && styles.tabActive]}
            onPress={() => setActiveSection(s.id)}
          >
            <Text style={styles.tabEmoji}>{s.emoji}</Text>
            <Text style={[styles.tabLabel, activeSection === s.id && styles.tabLabelActive]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
        <SectionContent section={activeSection} />
      </ScrollView>
    </View>
  );
}

function SectionContent({ section }: { section: Section }) {
  switch (section) {
    case 'how_to_play':
      return (
        <HelpSection title="How to Play — Interactive Tutorial">
          <Para>Backgammon is a two-player board game. Each player has 15 checkers that move in opposite directions around the board.</Para>
          <Para>The goal is to be the first to move all your checkers to your home board and bear them off.</Para>
          <Rule title="All matches are 5-point fixed length." />
          <Rule title="The dice are rolled automatically when the doubling cube cannot be used." />
          <Rule title="Player has a turn when the dice are shown on the right side of the board." />
          <Rule title="To double, resign, or exit the game, use the Menu button." />
        </HelpSection>
      );

    case 'game_modes':
      return (
        <HelpSection title="Game Modes">
          <SubTitle>Solo Mode — 10 Progressive Difficulty Levels</SubTitle>
          <Para>Challenge the computer at increasing difficulty:</Para>
          <LevelList />
          <SubTitle>Online Mode</SubTitle>
          <Para>Play over the internet with players around the world. Apple Game Center accounts are used to log in. Online games are standalone — no match format. Your score contributes to the global leaderboard.</Para>
          <SubTitle>Play with a Friend</SubTitle>
          <Para>Game Center — Invite and play with a Game Center friend.</Para>
          <Para>Private Room — Play with your friend by creating a private room. Share the room code with your friend so they can join.</Para>
          <Note>Scores in friend games are not saved and do not affect your total points.</Note>
        </HelpSection>
      );

    case 'online_rules':
      return (
        <HelpSection title="Online Rules">
          <Rule title="Penalty points are applied when a player leaves a game in progress." />
          <Rule title="A player should finish a move within 30–40 seconds." />
          <Rule title="If a timeout happens for the first time, an automatic move is made." />
          <Rule title="On second timeout, the inactive player loses the game." />
        </HelpSection>
      );

    case 'elo':
      return (
        <HelpSection title="Online ELO Rating">
          <Para>Your rating measures your skill level in online games. Everyone starts at 1500.</Para>
          <Rule title="Win against a higher-rated player → gain more points." />
          <Rule title="Lose against a lower-rated player → lose more points." />
          <Rule title="Rating adjusts after each game based on the skill difference." />
          <Para>You can show or hide your rating from Settings.</Para>
          <SubTitle>Rating Examples</SubTitle>
          <RatingExample from={1500} to={1700} result="win" gained={24} />
          <RatingExample from={1500} to={1700} result="loss" gained={-8} />
          <RatingExample from={1500} to={1300} result="win" gained={8} />
          <RatingExample from={1500} to={1300} result="loss" gained={-24} />
        </HelpSection>
      );

    case 'playing':
      return (
        <HelpSection title="Playing the Game">
          <SubTitle>How to Move Checkers</SubTitle>
          <Para>There are two ways to move your checkers:</Para>
          <Rule title="One-Tap — Tap a checker to move it automatically using the left die first. The left die is always played first if allowed by the rules. Tap the dice to swap positions and change the order of moves." />
          <Rule title="Two-Tap — First tap the checker to move, then tap the position to move to. Allowed positions are highlighted." />
          <SubTitle>Auto-Play Forced Moves</SubTitle>
          <Para>When only one legal move is possible, the game can play it automatically. Enable 'Autoplay Forced Moves' in Settings to speed up gameplay.</Para>
          <SubTitle>Board Themes</SubTitle>
          <Para>Customize the appearance of your board with different themes. Browse available board designs and switch between themes to find your favorite look. Open the game design window from the main screen.</Para>
        </HelpSection>
      );

    case 'doubling_cube':
      return (
        <HelpSection title="Doubling Cube">
          <Para>The doubling cube increases the stakes of the game. One side offers a double; the other may accept or reject. If accepted, the game value doubles. If rejected, the refusing player concedes immediately with the current stake.</Para>
          <SubTitle>Solo Mode</SubTitle>
          <Rule title="Player may re-double up to 64." />
          <Rule title="Crawford Game — neither player is permitted to use the doubling cube." />
          <Rule title="Crawford rules apply only to the single game immediately after a player reaches 4 points. In all subsequent games, the doubling cube is permitted again." />
          <SubTitle>Online Mode (X2)</SubTitle>
          <Note>This is not the doubling cube in classic rules!</Note>
          <Rule title="X2 is applied only to points — not rating." />
          <Rule title="X2 may be used once — no re-doubling." />
          <Rule title="Both players must have doubling enabled in Settings." />
          <Rule title="The X2 button appears after 10 moves." />
          <Rule title="A player may send X2 offer anytime, not only before rolling." />
          <SubTitle>Concede (Online)</SubTitle>
          <Para>A player can offer to concede the game with 1, 2, or 3 points:</Para>
          <Rule title="1 = Simple loss" />
          <Rule title="2 = Gammon" />
          <Rule title="3 = Backgammon" />
          <Rule title="If the offer is not the maximum possible, the opponent can accept or refuse. If refused, you cannot concede again for about 10 moves." />
        </HelpSection>
      );

    case 'faq':
      return (
        <HelpSection title="Frequently Asked Questions">
          <FaqItem q="What is a gammon?" a="A gammon occurs when the losing player has not borne off any checkers — worth 2 points." />
          <FaqItem q="What is a backgammon?" a="A backgammon occurs when the losing player has not borne off any checkers AND still has checkers on the bar or in the winner's home board — worth 3 points." />
          <FaqItem q="What is the Crawford Rule?" a="After a player reaches match point (one point away from winning), neither player can use the doubling cube for exactly one game." />
          <FaqItem q="How do I remove ads?" a="Tap the 'Remove Ads' button in Settings to unlock the ad-free version for a one-time purchase." />
          <FaqItem q="Does rating affect friend games?" a="No. Scores and ratings are only affected in online matchmaking games." />
          <FaqItem q="What happens if I close the app mid-game?" a="In online mode, you will receive penalty points for abandoning a game." />
        </HelpSection>
      );
  }
}

function HelpSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={helpStyles.section}>
      <Text style={helpStyles.title}>{title}</Text>
      {children}
    </View>
  );
}

function SubTitle({ children }: { children: string }) {
  return <Text style={helpStyles.subTitle}>{children}</Text>;
}

function Para({ children }: { children: string }) {
  return <Text style={helpStyles.para}>{children}</Text>;
}

function Rule({ title }: { title: string }) {
  return (
    <View style={helpStyles.rule}>
      <Text style={helpStyles.ruleDot}>▸</Text>
      <Text style={helpStyles.ruleText}>{title}</Text>
    </View>
  );
}

function Note({ children }: { children: string }) {
  return (
    <View style={helpStyles.note}>
      <Text style={helpStyles.noteText}>⚠️ {children}</Text>
    </View>
  );
}

function LevelList() {
  const levels = ['Beginner', 'Novice', 'Amateur', 'Club Player', 'Intermediate', 'Advanced', 'Expert', 'Master', 'Grandmaster', 'Champion'];
  return (
    <View style={helpStyles.levels}>
      {levels.map((l, i) => (
        <View key={l} style={helpStyles.levelItem}>
          <Text style={helpStyles.levelNum}>{i + 1}</Text>
          <Text style={helpStyles.levelName}>{l}</Text>
        </View>
      ))}
    </View>
  );
}

function RatingExample({ from, to, result, gained }: { from: number; to: number; result: 'win' | 'loss'; gained: number }) {
  return (
    <View style={helpStyles.ratingEx}>
      <Text style={helpStyles.ratingExText}>
        You ({from}) vs Opponent ({to}) — {result === 'win' ? '✅ Win' : '❌ Loss'}: {gained > 0 ? '+' : ''}{gained} points
      </Text>
    </View>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <View style={helpStyles.faq}>
      <Text style={helpStyles.faqQ}>Q: {q}</Text>
      <Text style={helpStyles.faqA}>A: {a}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0a00' },
  tabs: { maxHeight: 80, borderBottomWidth: 1, borderBottomColor: '#2a1200' },
  tabsContent: { paddingHorizontal: 12, gap: 8, alignItems: 'center', paddingVertical: 12 },
  tab: { alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#2a1200', minWidth: 80 },
  tabActive: { backgroundColor: COLORS.gold },
  tabEmoji: { fontSize: 18 },
  tabLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  tabLabelActive: { color: '#1a0a00', fontWeight: '700' },
  content: { flex: 1 },
  contentPadding: { padding: 20, paddingBottom: 60 },
});

const helpStyles = StyleSheet.create({
  section: { gap: 12 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.gold, marginBottom: 8 },
  subTitle: { fontSize: 16, fontWeight: '700', color: COLORS.goldLight, marginTop: 16, marginBottom: 4 },
  para: { fontSize: 15, color: COLORS.text, lineHeight: 22 },
  rule: { flexDirection: 'row', gap: 8, paddingLeft: 4 },
  ruleDot: { color: COLORS.gold, fontSize: 14, marginTop: 3 },
  ruleText: { flex: 1, fontSize: 14, color: COLORS.text, lineHeight: 21 },
  note: { backgroundColor: '#2a1200', borderRadius: 8, padding: 12, borderLeftWidth: 3, borderLeftColor: COLORS.gold },
  noteText: { fontSize: 14, color: COLORS.goldLight },
  levels: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  levelItem: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#2a1200', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  levelNum: { fontSize: 12, color: COLORS.gold, fontWeight: '700' },
  levelName: { fontSize: 13, color: COLORS.text },
  ratingEx: { backgroundColor: '#2a1200', borderRadius: 8, padding: 10 },
  ratingExText: { fontSize: 13, color: COLORS.text },
  faq: { backgroundColor: '#2a1200', borderRadius: 12, padding: 14, gap: 8 },
  faqQ: { fontSize: 14, fontWeight: '700', color: COLORS.gold },
  faqA: { fontSize: 14, color: COLORS.text, lineHeight: 20 },
});
