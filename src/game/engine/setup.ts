import type { Point } from '@/types/game';

/**
 * Standard backgammon starting position.
 * Index 0 = Point 1 (white's far end / black's home)
 * Index 23 = Point 24 (white's starting point / black's far end)
 *
 * White moves: index 23 → 0  (high to low)
 * Black moves: index 0 → 23  (low to high)
 */
export function getInitialBoard(): Point[] {
  const board: Point[] = Array.from({ length: 24 }, () => ({ count: 0, color: null }));

  // White checkers
  board[23] = { count: 2, color: 'white' }; // point 24
  board[12] = { count: 5, color: 'white' }; // point 13
  board[7]  = { count: 3, color: 'white' }; // point 8
  board[5]  = { count: 5, color: 'white' }; // point 6

  // Black checkers
  board[0]  = { count: 2, color: 'black' }; // point 1
  board[11] = { count: 5, color: 'black' }; // point 12
  board[16] = { count: 3, color: 'black' }; // point 17
  board[18] = { count: 5, color: 'black' }; // point 19

  return board;
}

/** Convert 1-based point number to board array index */
export function pointToIndex(point: number): number {
  return point - 1;
}

/** Convert board array index to 1-based point number */
export function indexToPoint(index: number): number {
  return index + 1;
}
