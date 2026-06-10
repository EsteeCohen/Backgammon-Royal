export const COLORS = {
  background: '#0d0500',
  surface: '#1f0e00',
  surfaceElevated: '#2a1200',
  border: '#3a1a00',

  gold: '#d4a04a',
  goldLight: '#e8c06a',
  goldDark: '#b8882e',

  text: '#f0e0c0',
  textMuted: '#8a6040',
  textDisabled: '#4a2a10',

  white: '#f5f0e8',
  black: '#1a0a00',

  checkerWhite: '#f5f0e8',
  checkerBlack: '#2a1200',

  boardLight: '#c8a060',
  boardDark: '#8b4513',
  boardBackground: '#1a0800',
  boardBorder: '#6b3510',

  error: '#e05040',
  success: '#50a060',
  warning: '#d4a04a',

  online: '#50c050',
  offline: '#808080',
} as const;

export type ColorKey = keyof typeof COLORS;
