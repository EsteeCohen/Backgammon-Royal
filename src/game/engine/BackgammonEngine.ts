import type { GameState, PlayerColor, GameResult } from '@/types/game';
import { getInitialBoard } from './setup';
import { getLegalMoves, applyMove } from './moves';
import { checkGameResult } from './rules';

export class BackgammonEngine {
  private state: GameState;

  constructor(targetScore = 5) {
    this.state = createInitialState(targetScore);
  }

  getState(): Readonly<GameState> {
    return this.state;
  }

  rollDice(): number[] {
    if (this.state.phase !== 'rolling') {
      throw new Error('Not in rolling phase');
    }
    const d1 = roll();
    const d2 = roll();
    const dice = d1 === d2 ? [d1, d1, d1, d1] : [d1, d2];
    this.state = {
      ...this.state,
      dice,
      usedDice: new Array(dice.length).fill(false),
      phase: 'moving',
    };
    return dice;
  }

  /**
   * Returns all legal destination squares for the given source.
   * Returns [] when the player has no legal moves at all (pass turn).
   */
  getLegalDestinations(from: number | 'bar'): (number | 'off')[] {
    return getLegalMoves(this.state, from);
  }

  /**
   * All sources the current player can legally move from.
   */
  getLegalSources(): (number | 'bar')[] {
    const player = this.state.currentPlayer;
    if (this.state.bar[player] > 0) return ['bar'];

    const sources: number[] = [];
    for (let i = 0; i < 24; i++) {
      const pt = this.state.board[i];
      if (pt.color === player && pt.count > 0) {
        if (getLegalMoves(this.state, i).length > 0) {
          sources.push(i);
        }
      }
    }
    return sources;
  }

  /**
   * Execute a move and update state.
   */
  move(from: number | 'bar', to: number | 'off'): { gameResult: GameResult | null } {
    const legal = getLegalMoves(this.state, from);
    if (!legal.includes(to)) {
      throw new Error(`Illegal move: ${String(from)} → ${String(to)}`);
    }

    const { nextState, move } = applyMove(this.state, from, to);
    this.state = nextState;

    this.state = {
      ...this.state,
      moveHistory: [
        ...this.state.moveHistory,
        {
          player: this.state.currentPlayer === 'white' ? 'black' : 'white', // already switched? no — apply move switches
          dice: [...this.state.dice],
          moves: [move],
        },
      ],
      moveCount: this.state.moveCount + 1,
    };

    const gameResult = checkGameResult(this.state);
    if (gameResult) {
      this.state = { ...this.state, phase: 'gameover' };
      return { gameResult };
    }

    if (this.allDiceUsed() || this.getLegalSources().length === 0) {
      this.endTurn();
    }

    return { gameResult: null };
  }

  /**
   * Offer to double. Only valid when cube is owned by current player or center.
   */
  offerDouble(): void {
    const { cube, currentPlayer, phase, isCrawfordGame } = this.state;
    if (isCrawfordGame || !cube.enabled) throw new Error('Doubling not allowed');
    if (cube.owner !== 'center' && cube.owner !== currentPlayer) throw new Error('Not your cube');
    if (phase !== 'rolling') throw new Error('Can only double before rolling');
    this.state = { ...this.state, phase: 'doubling' };
  }

  acceptDouble(): void {
    if (this.state.phase !== 'doubling') throw new Error('No pending double offer');
    const newValue = this.state.cube.value * 2;
    this.state = {
      ...this.state,
      cube: {
        ...this.state.cube,
        value: newValue,
        owner: this.state.currentPlayer, // opponent now owns
      },
      gameStake: newValue,
      phase: 'rolling',
    };
  }

  rejectDouble(): GameResult {
    if (this.state.phase !== 'doubling') throw new Error('No pending double offer');
    const winner = this.state.currentPlayer;
    const loser = winner === 'white' ? 'black' : 'white';
    return this.resolveGame(winner, loser, 1);
  }

  private allDiceUsed(): boolean {
    return this.state.usedDice.every(Boolean);
  }

  private endTurn(): void {
    const next: PlayerColor = this.state.currentPlayer === 'white' ? 'black' : 'white';
    this.state = {
      ...this.state,
      currentPlayer: next,
      dice: [],
      usedDice: [],
      phase: 'rolling',
    };
  }

  private resolveGame(winner: PlayerColor, loser: PlayerColor, multiplier: number): GameResult {
    const loserOff = this.state.off[loser];
    const hasCheckerInWinnerHome = this.state.board
      .slice(winner === 'white' ? 0 : 18, winner === 'white' ? 6 : 24)
      .some((p) => p.color === loser && p.count > 0);
    const hasCheckerOnBar = this.state.bar[loser] > 0;

    let pointsWon = 1;
    if (loserOff === 0) {
      pointsWon = hasCheckerInWinnerHome || hasCheckerOnBar ? 3 : 2;
    }

    const finalStake = pointsWon * multiplier * this.state.cube.value;
    const newMatchScore = {
      ...this.state.matchScore,
      [winner]: this.state.matchScore[winner] + finalStake,
    };

    const matchWinner =
      newMatchScore[winner] >= this.state.targetScore ? winner : null;

    this.state = {
      ...this.state,
      matchScore: newMatchScore,
      phase: 'gameover',
    };

    return { winner, loser, pointsWon, finalStake, matchWinner };
  }

  startNewGame(switchFirst = false): void {
    const first: PlayerColor = switchFirst
      ? this.state.currentPlayer === 'white'
        ? 'black'
        : 'white'
      : determineOpeningPlayer();

    const prevScore = this.state.matchScore;
    const isAdjacentToTarget =
      prevScore.white === this.state.targetScore - 1 ||
      prevScore.black === this.state.targetScore - 1;

    this.state = {
      ...createInitialState(this.state.targetScore),
      matchScore: prevScore,
      currentPlayer: first,
      isCrawfordGame: isAdjacentToTarget,
    };
  }
}

function createInitialState(targetScore: number): GameState {
  return {
    board: getInitialBoard(),
    bar: { white: 0, black: 0 },
    off: { white: 0, black: 0 },
    dice: [],
    usedDice: [],
    currentPlayer: determineOpeningPlayer(),
    phase: 'rolling',
    cube: { value: 1, owner: 'center', enabled: true },
    matchScore: { white: 0, black: 0 },
    targetScore,
    gameStake: 1,
    isCrawfordGame: false,
    moveCount: 0,
    moveHistory: [],
  };
}

function roll(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function determineOpeningPlayer(): PlayerColor {
  return Math.random() < 0.5 ? 'white' : 'black';
}
