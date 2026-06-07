import type { GameState, PlayerColor, Move } from '@/types/game';
import { isBlocked, canBearOff, barEntryIndex, getDirection, allCheckersInHome } from './rules';

/**
 * Returns all legal destinations for a checker at `from`.
 * Handles: bar entry, normal moves, bearing off.
 */
export function getLegalMoves(
  state: GameState,
  from: number | 'bar'
): (number | 'off')[] {
  const player = state.currentPlayer;
  const availableDice = getAvailableDice(state);

  if (availableDice.length === 0) return [];

  // Must enter from bar before any other move
  if (state.bar[player] > 0 && from !== 'bar') return [];

  const destinations = new Set<number | 'off'>();

  for (const die of new Set(availableDice)) {
    if (from === 'bar') {
      const target = barEntryIndex(player, die);
      if (!isBlocked(state, target, player)) {
        destinations.add(target);
      }
    } else {
      const direction = getDirection(player);
      const target = from + direction * die;

      if (target >= 0 && target <= 23) {
        if (!isBlocked(state, target, player)) {
          destinations.add(target);
        }
      } else if (target < 0 || target > 23) {
        // Potential bear-off
        if (canBearOff(state, from, die, player)) {
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

  const board = state.board.map((p) => ({ ...p }));
  const bar = { ...state.bar };
  const off = { ...state.off };

  // Remove checker from source
  if (from === 'bar') {
    bar[player]--;
  } else {
    board[from] = decrementPoint(board[from]);
  }

  // Check if destination is a blot
  let hit = false;
  if (to !== 'off') {
    if (board[to].color === opponent && board[to].count === 1) {
      hit = true;
      board[to] = { count: 0, color: null };
      bar[opponent]++;
    }
    board[to] = {
      count: board[to].count + 1,
      color: player,
    };
  } else {
    off[player]++;
  }

  // Mark the die as used
  const dieUsed = findAndMarkDie(state, from, to, player);
  const usedDice = [...state.usedDice];
  usedDice[dieUsed.dieIndex] = true;

  const nextPlayer = shouldEndTurn(state, usedDice)
    ? (player === 'white' ? 'black' : 'white')
    : player;

  const nextPhase = shouldEndTurn(state, usedDice) ? 'rolling' : 'moving';
  const nextDice = shouldEndTurn(state, usedDice) ? [] : state.dice;
  const nextUsedDice = shouldEndTurn(state, usedDice) ? [] : usedDice;

  const nextState: GameState = {
    ...state,
    board,
    bar,
    off,
    usedDice,
    currentPlayer: nextPlayer,
    phase: nextPhase,
    dice: nextDice,
    usedDice: nextUsedDice,
    moveCount: state.moveCount + 1,
  };

  const move: Move = {
    from,
    to,
    dieUsed: dieUsed.value,
    hit,
  };

  return { nextState, move };
}

function decrementPoint(point: { count: number; color: string | null }) {
  if (point.count <= 1) return { count: 0, color: null };
  return { ...point, count: point.count - 1 };
}

function findAndMarkDie(
  state: GameState,
  from: number | 'bar',
  to: number | 'off',
  player: PlayerColor
): { dieIndex: number; value: number } {
  const direction = player === 'white' ? -1 : 1;
  let distance: number;

  if (from === 'bar') {
    distance = player === 'white' ? 24 - (to as number) : (to as number) + 1;
  } else if (to === 'off') {
    distance = player === 'white' ? (from as number) + 1 : 24 - (from as number);
  } else {
    distance = Math.abs((to as number) - (from as number));
  }

  // Find first unused die matching the distance (or for bearing off, first die ≥ distance)
  for (let i = 0; i < state.dice.length; i++) {
    if (!state.usedDice[i] && state.dice[i] === distance) {
      return { dieIndex: i, value: state.dice[i] };
    }
  }

  // For bear-off with higher die value
  for (let i = 0; i < state.dice.length; i++) {
    if (!state.usedDice[i] && state.dice[i] > distance) {
      return { dieIndex: i, value: state.dice[i] };
    }
  }

  throw new Error(`No matching die for distance ${distance}`);
}

function shouldEndTurn(state: GameState, usedDice: boolean[]): boolean {
  return usedDice.every(Boolean);
}

/**
 * Returns true if the current player has no legal moves at all.
 * In that case, the turn should be passed automatically.
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
