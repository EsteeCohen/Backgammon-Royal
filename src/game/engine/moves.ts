import type { GameState, PlayerColor, Move, Point } from '@/types/game';
import { isBlocked, canBearOff, barEntryIndex, getDirection } from './rules';

/**
 * Returns all legal destinations for a checker at `from`.
 * Handles: bar entry, normal moves, bearing off.
 */
export function getLegalMoves(
  state: GameState,
  from: number | 'bar'
): (number | 'off')[] {
  const player = state.currentPlayer;
  const available = getAvailableDice(state);

  if (available.length === 0) return [];

  // Must enter from bar before any other move
  if (state.bar[player] > 0 && from !== 'bar') return [];

  const destinations = new Set<number | 'off'>();

  for (const die of new Set(available)) {
    if (from === 'bar') {
      const target = barEntryIndex(player, die);
      if (!isBlocked(state, target, player)) {
        destinations.add(target);
      }
    } else {
      const direction = getDirection(player);
      const target = (from as number) + direction * die;

      if (target >= 0 && target <= 23) {
        if (!isBlocked(state, target, player)) {
          destinations.add(target);
        }
      } else {
        // Potential bear-off
        if (canBearOff(state, from as number, die, player)) {
          destinations.add('off');
        }
      }
    }
  }

  return Array.from(destinations);
}

/** Available (unused) dice values */
export function getAvailableDice(state: GameState): number[] {
  return state.dice.filter((_, i) => !state.usedDice[i]);
}

/**
 * Apply a move and return the new state + move record.
 * Does NOT validate legality — call getLegalMoves first.
 */
export function applyMove(
  state: GameState,
  from: number | 'bar',
  to: number | 'off'
): { nextState: GameState; move: Move } {
  const player = state.currentPlayer;
  const opponent: PlayerColor = player === 'white' ? 'black' : 'white';

  const board: Point[] = state.board.map((p) => ({ ...p }));
  const bar = { ...state.bar };
  const off = { ...state.off };

  // Remove checker from source
  if (from === 'bar') {
    bar[player]--;
  } else {
    board[from as number] = decrementPoint(board[from as number]);
  }

  // Place checker at destination (or bear off)
  let hit = false;
  if (to !== 'off') {
    const toIdx = to as number;
    if (board[toIdx].color === opponent && board[toIdx].count === 1) {
      hit = true;
      board[toIdx] = { count: 0, color: null };
      bar[opponent]++;
    }
    board[toIdx] = { count: board[toIdx].count + 1, color: player };
  } else {
    off[player]++;
  }

  // Mark the die as used
  const dieUsed = findDieForMove(state, from, to, player);
  const nextUsedDice = [...state.usedDice];
  nextUsedDice[dieUsed.dieIndex] = true;

  const turnEnds = nextUsedDice.every(Boolean);
  const nextPlayer: PlayerColor = turnEnds
    ? (player === 'white' ? 'black' : 'white')
    : player;

  const nextState: GameState = {
    ...state,
    board,
    bar,
    off,
    usedDice: turnEnds ? [] : nextUsedDice,
    dice: turnEnds ? [] : state.dice,
    currentPlayer: nextPlayer,
    phase: turnEnds ? 'rolling' : 'moving',
    moveCount: state.moveCount + 1,
  };

  return {
    nextState,
    move: { from, to, dieUsed: dieUsed.value, hit },
  };
}

function decrementPoint(point: Point): Point {
  return point.count <= 1
    ? { count: 0, color: null }
    : { count: point.count - 1, color: point.color };
}

function findDieForMove(
  state: GameState,
  from: number | 'bar',
  to: number | 'off',
  player: PlayerColor
): { dieIndex: number; value: number } {
  let distance: number;

  if (from === 'bar') {
    distance = player === 'white' ? 24 - (to as number) : (to as number) + 1;
  } else if (to === 'off') {
    distance = player === 'white' ? (from as number) + 1 : 24 - (from as number);
  } else {
    distance = Math.abs((to as number) - (from as number));
  }

  // Exact match first
  for (let i = 0; i < state.dice.length; i++) {
    if (!state.usedDice[i] && state.dice[i] === distance) {
      return { dieIndex: i, value: state.dice[i] };
    }
  }

  // Bear-off with higher die (no exact match needed)
  for (let i = 0; i < state.dice.length; i++) {
    if (!state.usedDice[i] && state.dice[i] > distance) {
      return { dieIndex: i, value: state.dice[i] };
    }
  }

  throw new Error(`No matching die for distance ${distance}`);
}

/**
 * Returns true if the current player has no legal moves at all.
 */
export function hasNoLegalMoves(state: GameState): boolean {
  const player = state.currentPlayer;
  if (state.bar[player] > 0) {
    return getLegalMoves(state, 'bar').length === 0;
  }
  for (let i = 0; i < 24; i++) {
    if (state.board[i].color === player && state.board[i].count > 0) {
      if (getLegalMoves(state, i).length > 0) return false;
    }
  }
  return true;
}
