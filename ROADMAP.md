# Backgammon Royal — Project Roadmap

Each item below is a separate branch + PR. Branch off `develop`, PR back to `develop`.
Tag a `release/v*` when a milestone is complete. Push tag → auto-builds to App Store.

---

## ✅ MILESTONE 0 — Foundation
> Branch: `feature/project-foundation` → PR → `develop`

- [x] Expo project config (package.json, app.json, tsconfig, babel, metro, eas.json)
- [x] .gitignore updated for Expo
- [x] GitHub Actions: CI (lint + typecheck) + EAS Build (preview + production)
- [x] GitHub issue templates + PR template
- [x] App shell: Expo Router layout, Home screen, Leaderboard, Profile tabs
- [x] Game screens scaffolding: Solo, Online, Play with Friend, Private Room
- [x] Help & Tutorial screen (full content)
- [x] Settings screen (sound, autoplay, doubling, remove ads)
- [x] src/types: game.ts, user.ts
- [x] src/constants: colors.ts, themes.ts, emojis.ts
- [x] Game engine: setup, rules, moves, BackgammonEngine class
- [x] AI player skeleton (10 difficulty levels)

---

## 🔲 MILESTONE 1 — Game Board UI
> Branch: `feature/game-board-ui` → PR → `develop`

- [ ] BackgammonBoard component (SVG or React Native layout)
- [ ] Point component (triangle with checkers)
- [ ] Checker component (circle, colors, count label)
- [ ] Dice component (animated dice display)
- [ ] Bar area (checkers on the bar)
- [ ] Bear-off area
- [ ] Board theme support (from constants/themes.ts)
- [ ] Checker drag/tap interaction (tap source → tap destination)
- [ ] Highlight legal destination points
- [ ] Dice tap to swap order
- [ ] DoublingCube / X2 button display

**Commit checkpoints:**
1. Static board layout renders correctly
2. Checkers positioned in initial setup
3. Tap-to-move interaction working
4. Dice display + swap
5. Highlight legal moves

---

## 🔲 MILESTONE 2 — Solo Mode (vs Computer)
> Branch: `feature/solo-mode` → PR → `develop`

- [ ] Difficulty selection screen (10 levels)
- [ ] Wire BackgammonEngine to board UI
- [ ] AI move execution with animation delay
- [ ] Auto-roll dice for AI
- [ ] Autoplay forced moves setting
- [ ] Doubling cube (Crawford rule)
- [ ] Concede / exit match dialog (menu button)
- [ ] Game over screen (winner, points won)
- [ ] 5-point match tracking
- [ ] Save solo stats to local storage

**Commit checkpoints:**
1. Engine wired to board, manual moves work
2. AI takes turns and moves
3. Doubling cube + Crawford rule
4. Game over + match tracking
5. Stats saved

---

## 🔲 MILESTONE 3 — Firebase Setup
> Branch: `feature/firebase-setup` → PR → `develop`

- [ ] Create Firebase project (user does this manually)
- [ ] Add .env with Firebase credentials
- [ ] Firebase Auth (anonymous → link with Game Center later)
- [ ] Firestore: users collection schema
- [ ] Firestore: leaderboard collection
- [ ] Firebase Realtime Database: active games schema
- [ ] src/services/firebase/config.ts
- [ ] src/services/firebase/auth.ts
- [ ] src/services/firebase/database.ts
- [ ] src/services/firebase/leaderboard.ts
- [ ] Zustand stores: userStore, settingsStore

**Commit checkpoints:**
1. Firebase initialized, anonymous auth working
2. User profile created/fetched from Firestore
3. Settings persisted in Firestore

---

## 🔲 MILESTONE 4 — Online Matchmaking
> Branch: `feature/online-matchmaking` → PR → `develop`

- [ ] Matchmaking queue in Realtime Database
- [ ] Game room creation + join
- [ ] Real-time game state sync via Realtime Database
- [ ] Move timeout (30–40 sec): auto-move → lose on second timeout
- [ ] Penalty points for leaving mid-game
- [ ] X2 doubling (online rules, appears after 10 moves)
- [ ] Concede offer (1/2/3 points, opponent can refuse)
- [ ] ELO calculation after each game
- [ ] Online stats saved to Firestore

**Commit checkpoints:**
1. Two devices can join the same game room
2. Moves sync in real-time
3. Timeout enforcement
4. X2 + concede logic
5. ELO + stats saved

---

## 🔲 MILESTONE 5 — Play With Friend (Private Room)
> Branch: `feature/private-room` → PR → `develop`

- [ ] Room code generation (6-char alphanumeric)
- [ ] Create room → wait for opponent to join
- [ ] Join room by code
- [ ] Real-time game same as online (no rating effect)
- [ ] Share room code via iOS share sheet

**Commit checkpoints:**
1. Room creation + joining working
2. Game plays end-to-end

---

## 🔲 MILESTONE 6 — Game Center Auth
> Branch: `feature/game-center-auth` → PR → `develop`

- [ ] EAS Development Build (needed for Game Center native module)
- [ ] Expo custom module or react-native-game-center integration
- [ ] Sign in with Game Center on app launch
- [ ] Link Game Center ID to Firebase user
- [ ] Display Game Center avatar + name
- [ ] Game Center Leaderboard sync (optional)

---

## 🔲 MILESTONE 7 — Leaderboard + Profile
> Branch: `feature/leaderboard-profile` → PR → `develop`

- [ ] Leaderboard screen: ELO tab + Points tab
- [ ] Top 100 players (paginated)
- [ ] Current player rank highlight
- [ ] Profile screen: avatar, name, ELO, stats
- [ ] Solo stats display (wins/losses per difficulty)
- [ ] Online stats display (games, wins, rating history chart)
- [ ] Show/hide rating toggle (from Settings)

---

## 🔲 MILESTONE 8 — Emoji Reactions
> Branch: `feature/emoji-reactions` → PR → `develop`

- [ ] EmojiPicker component (8 preset emojis)
- [ ] Send emoji during game (tap button → pick → send)
- [ ] Receive emoji from opponent (floating animation above board)
- [ ] Sync reactions via Realtime Database

---

## 🔲 MILESTONE 9 — Ads + IAP
> Branch: `feature/ads-iap` → PR → `develop`

- [ ] AdMob setup (banner ads on non-game screens)
- [ ] Interstitial ad after game ends (if not ad-free)
- [ ] RevenueCat setup
- [ ] $2.99 IAP product in App Store Connect (user does this)
- [ ] Purchase flow in Settings
- [ ] Restore purchases
- [ ] isAdFree persisted in Firestore + local
- [ ] Hide all ads when isAdFree = true

---

## 🔲 MILESTONE 10 — Board Themes
> Branch: `feature/board-themes` → PR → `develop`

- [ ] Theme picker screen (preview cards)
- [ ] Apply theme to BackgammonBoard component
- [ ] Checker color customization
- [ ] Move direction toggle (which side is home)
- [ ] Theme saved to user settings

---

## 🔲 MILESTONE 11 — Sound + Haptics
> Branch: `feature/sound-haptics` → PR → `develop`

- [ ] Sound assets: dice roll, checker move, hit, bear off, win, lose
- [ ] expo-av sound playback service
- [ ] expo-haptics for vibration
- [ ] Respect sound mode setting (full / vibration only / silent)

---

## 🔲 MILESTONE 12 — Polish + TestFlight
> Branch: `release/v1.0.0` → PR → `main` → tag `v1.0.0`

- [ ] Splash screen asset
- [ ] App icon
- [ ] Onboarding flow (first launch)
- [ ] Loading states + error states
- [ ] Offline detection
- [ ] EAS build production → TestFlight
- [ ] App Store screenshots + metadata
- [ ] Submit for App Store review

---

## 🔲 POST-LAUNCH
- [ ] Push notifications (your turn, game invite)
- [ ] Tournament mode
- [ ] Replay viewer
- [ ] Localization (Hebrew, more languages)
