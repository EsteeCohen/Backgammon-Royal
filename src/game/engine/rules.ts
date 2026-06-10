import type { GameState, PlayerColor, GameResult } from '@/types/game';

/** True if a point is blocked for the given player (opponent has 2+ checkers) */
export function isBlocked(state: GameState, pointIndex: number, player: PlayerColor): boolean {
  const pt = state.board[pointIndex];
  const opponent: PlayerColor = player === 'white' ? 'black' : 'white';
  return pt.color === opponent && pt.count >= 2;
}

/** True if the given player has all 15 checkers in their home board */
export function allCheckersInHome(state: GameState, player: PlayerColor): boolean {
  const [homeStart, homeEnd] =
    player === 'white' ? [0, 5] : [18, 23]; // indices for points 1–6 and 19–24

  for (let i = 0; i < 24; i++) {
    if (i >= homeStart && i <= homeEnd) continue;
    if (state.board[i].color === player && state.board[i].count > 0) return false;
  }
  if (state.bar[player] > 0) return false;
  return true;
}

/** For bearing off: minimum pip the player can bear off with a given die value */
export function canBearOff(state: GameState, pointIndex: number, die: number, player: PlayerColor): boolean {
  if (!allCheckersInHome(state, player)) return false;

  const distance =
    player === 'white' ? pointIndex + 1 : 24 - pointIndex;

  if (distance === die) return true;

  if (distance < die) {
    // Can only bear off the checker on the highest occupied point
    // when no checker is further back
    const [, homeEnd] = player === 'white' ? [0, 5] : [18, 23];
    for (let i = homeEnd; i > pointIndex; i--) {
      if (player === 'white' && i < pointIndex) break;
      if (player === 'black' && i > pointIndex) break;
      if (state.board[i].color === player && state.board[i].count > 0) return false;
    }
    return true;
  }

  return false;
}

/** Determine game result. Returns null if the game is still ongoing. */
export function checkGameResult(state: GameState): GameResult | null {
  const { off, board, bar, targetScore, matchScore, cube } = state;

  for (const player of ['white', 'black'] as PlayerColor[]) {
    if (off[player] === 15) {
      const winner = player;
      const loser: PlayerColor = player === 'white' ? 'black' : 'white';

      const loserBoreOff = off[loser];
      const loserOnBar = bar[loser] > 0;
      const winnerHomeIndices =
        winner === 'white' ? [0, 1, 2, 3, 4, 5] : [18, 19, 20, 21, 22, 23];
      const loserInWinnerHome = winnerHomeIndices.some(
        (i) => board[i].color === loser && board[i].count > 0
      );

      let pointsWon = 1;
      if (loserBoreOff === 0) {
        pointsWon = loserOnBar || loserInWinnerHome ? 3 : 2;
      }

      const finalStake = pointsWon * cube.value;
      const newMatchScore = { ...matchScore, [winner]: matchScore[winner] + finalStake };
      const matchWinner = newMatchScore[winner] >= targetScore ? winner : null;

      return { winner, loser, pointsWon, finalStake, matchWinner };
    }
  }

  return null;
}

/** Direction of movement per player: white decreases index, black increases */
export function getDirection(player: PlayerColor): 1 | -1 {
  return player === 'black' ? 1 : -1;
}

/** Bar entry target indices for a given die roll */
export function barEntryIndex(player: PlayerColor, die: number): number {
  if (player === 'white') {
    // White enters on opponent's home (points 19-24, indices 18-23)
    return 24 - die; // die=1 → index 23, die=6 → index 18
  } else {
    // Black enters on opponent's home (points 1-6, indices 0-5)
    return die - 1;  // die=1 → index 0, die=6 → index 5
  }
}
