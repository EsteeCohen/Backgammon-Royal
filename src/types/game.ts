export type PlayerColor = 'white' | 'black';

export type GamePhase =
  | 'setup'       // waiting for both players
  | 'rolling'     // current player needs to roll
  | 'moving'      // current player is moving checkers
  | 'doubling'    // doubling cube offer pending
  | 'gameover';   // game ended

export type DifficultyLevel =
  | 'beginner'
  | 'novice'
  | 'amateur'
  | 'club'
  | 'intermediate'
  | 'advanced'
  | 'expert'
  | 'master'
  | 'grandmaster'
  | 'champion';

export interface Point {
  count: number;
  color: PlayerColor | null;
}

export interface BarState {
  white: number;
  black: number;
}

export interface OffState {
  white: number;
  black: number;
}

export interface DoublingCubeState {
  value: number;           // 1 | 2 | 4 | 8 | 16 | 32 | 64
  owner: PlayerColor | 'center';
  enabled: boolean;
}

export interface Move {
  from: number | 'bar';   // point index 0–23 or 'bar'
  to: number | 'off';     // point index 0–23 or 'off'
  dieUsed: number;
  hit: boolean;           // was a blot hit?
}

export interface MoveRecord {
  player: PlayerColor;
  dice: number[];
  moves: Move[];
}

export interface GameState {
  /** 24 points, index 0 = point 1 (white's far end), index 23 = point 24 */
  board: Point[];
  bar: BarState;
  off: OffState;
  dice: number[];
  usedDice: boolean[];
  currentPlayer: PlayerColor;
  phase: GamePhase;
  cube: DoublingCubeState;
  matchScore: { white: number; black: number };
  targetScore: number;        // 5 for standard 5-point match
  gameStake: number;          // current game value (affected by cube)
  isCrawfordGame: boolean;
  moveCount: number;          // total half-moves played this game
  moveHistory: MoveRecord[];
}

export interface GameResult {
  winner: PlayerColor;
  loser: PlayerColor;
  pointsWon: number;          // 1 = normal, 2 = gammon, 3 = backgammon
  finalStake: number;         // pointsWon × cube value
  matchWinner: PlayerColor | null;
}

export type GameMode = 'solo' | 'online' | 'friend_room' | 'friend_gamecenter';

export interface ConcedeOffer {
  from: PlayerColor;
  points: 1 | 2 | 3;
}

export interface DoublingOffer {
  from: PlayerColor;
}
