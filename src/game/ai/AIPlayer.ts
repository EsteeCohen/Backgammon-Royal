import type { GameState, PlayerColor, DifficultyLevel } from '@/types/game';
import { getLegalMoves, getAvailableDice, hasNoLegalMoves, applyMove } from '../engine/moves';

export interface AIMove {
  from: number | 'bar';
  to: number | 'off';
}

/**
 * Returns the AI's chosen move sequence for the current state.
 * Higher difficulty levels use better evaluation functions.
 */
export function getAIMoves(state: GameState, difficulty: DifficultyLevel): AIMove[] {
  const errorRate = difficultyErrorRate(difficulty);
  return computeMoveSequence(state, errorRate);
}

/** Compute the AI's full move sequence for its turn */
function computeMoveSequence(state: GameState, errorRate: number): AIMove[] {
  const moves: AIMove[] = [];
  let currentState = state;

  while (getAvailableDice(currentState).length > 0 && !hasNoLegalMoves(currentState)) {
    const move = pickBestMove(currentState, errorRate);
    if (!move) break;
    moves.push(move);

    const { nextState } = applyMove(currentState, move.from, move.to);
    currentState = nextState;
  }

  return moves;
}

/** Pick the best move given the current state */
function pickBestMove(state: GameState, errorRate: number): AIMove | null {
  // With errorRate probability, pick randomly instead of optimally
  if (Math.random() < errorRate) return pickRandomMove(state);

  const sources = getAllSources(state);
  if (sources.length === 0) return null;

  let bestScore = -Infinity;
  let bestMove: AIMove | null = null;

  for (const from of sources) {
    const destinations = getLegalMoves(state, from);
    for (const to of destinations) {
      const score = evaluateMove(state, from, to);
      if (score > bestScore) {
        bestScore = score;
        bestMove = { from, to };
      }
    }
  }

  return bestMove;
}

function pickRandomMove(state: GameState): AIMove | null {
  const sources = getAllSources(state);
  if (sources.length === 0) return null;
  const from = sources[Math.floor(Math.random() * sources.length)];
  const dests = getLegalMoves(state, from);
  if (dests.length === 0) return null;
  const to = dests[Math.floor(Math.random() * dests.length)];
  return { from, to };
}

function getAllSources(state: GameState): (number | 'bar')[] {
  const player = state.currentPlayer;
  if (state.bar[player] > 0) return ['bar'];
  const sources: number[] = [];
  for (let i = 0; i < 24; i++) {
    if (state.board[i].color === player && state.board[i].count > 0) {
      if (getLegalMoves(state, i).length > 0) sources.push(i);
    }
  }
  return sources;
}

/**
 * Heuristic evaluation of a single move.
 * Higher = better for current player.
 */
function evaluateMove(
  state: GameState,
  from: number | 'bar',
  to: number | 'off'
): number {
  const player = state.currentPlayer;
  let score = 0;

  // Bearing off is great
  if (to === 'off') return 1000;

  const toIdx = to as number;
  const board = state.board;
  const opponent: PlayerColor = player === 'white' ? 'black' : 'white';

  // Hitting a blot is good
  if (board[toIdx].color === opponent && board[toIdx].count === 1) score += 50;

  // Advancing is good (pip reduction)
  if (from !== 'bar') {
    const advance = player === 'white'
      ? (from as number) - toIdx       // white moves toward 0
      : toIdx - (from as number);      // black moves toward 23
    score += advance * 2;
  }

  // Landing on a point with own checker is slightly good (building a prime)
  if (board[toIdx].color === player) score += 5;

  // Avoid leaving blots in opponent's home area
  const isVulnerable = from !== 'bar' && board[from as number].count === 1;
  const isInOpponentHome = player === 'white'
    ? (from as number) >= 18 // points 19-24
    : (from as number) <= 5;  // points 1-6
  if (isVulnerable && isInOpponentHome) score -= 20;

  return score;
}

/** Error rate by difficulty: 0 = perfect, 1 = random */
function difficultyErrorRate(difficulty: DifficultyLevel): number {
  const rates: Record<DifficultyLevel, number> = {
    beginner:      0.95,
    novice:        0.80,
    amateur:       0.65,
    club:          0.50,
    intermediate:  0.35,
    advanced:      0.20,
    expert:        0.10,
    master:        0.05,
    grandmaster:   0.02,
    champion:      0.00,
  };
  return rates[difficulty];
}
