export interface BoardTheme {
  id: string;
  name: string;
  preview: string;
  pointColorLight: string;
  pointColorDark: string;
  boardBackground: string;
  borderColor: string;
  barColor: string;
  checkerWhite: string;
  checkerBlack: string;
  checkerWhiteBorder: string;
  checkerBlackBorder: string;
}

export const BOARD_THEMES: BoardTheme[] = [
  {
    id: 'classic',
    name: 'Classic',
    preview: '🟫',
    pointColorLight: '#c8a060',
    pointColorDark: '#8b4513',
    boardBackground: '#2c1400',
    borderColor: '#6b3510',
    barColor: '#3a1a08',
    checkerWhite: '#f5f0e8',
    checkerBlack: '#1a0a00',
    checkerWhiteBorder: '#d0c0a0',
    checkerBlackBorder: '#4a2a10',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    preview: '🟦',
    pointColorLight: '#2060c0',
    pointColorDark: '#0a2060',
    boardBackground: '#050a1a',
    borderColor: '#102040',
    barColor: '#080d20',
    checkerWhite: '#e0e8ff',
    checkerBlack: '#0a1030',
    checkerWhiteBorder: '#a0b0d0',
    checkerBlackBorder: '#2030a0',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    preview: '🟩',
    pointColorLight: '#20a060',
    pointColorDark: '#0a4020',
    boardBackground: '#051a0a',
    borderColor: '#104020',
    barColor: '#081a0d',
    checkerWhite: '#e0ffe0',
    checkerBlack: '#0a2010',
    checkerWhiteBorder: '#80c080',
    checkerBlackBorder: '#208040',
  },
  {
    id: 'crimson',
    name: 'Crimson',
    preview: '🟥',
    pointColorLight: '#c02020',
    pointColorDark: '#600a0a',
    boardBackground: '#1a0505',
    borderColor: '#401010',
    barColor: '#1a0808',
    checkerWhite: '#fff0f0',
    checkerBlack: '#200808',
    checkerWhiteBorder: '#d09090',
    checkerBlackBorder: '#a02020',
  },
];

export const DEFAULT_THEME_ID = 'classic';
