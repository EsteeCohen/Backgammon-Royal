export interface UserProfile {
  uid: string;
  displayName: string;
  gameCenterId?: string;
  avatarUrl?: string;
  rating: number;               // ELO rating, starts at 1500
  showRating: boolean;
  isAdFree: boolean;
  createdAt: number;            // Unix ms
  lastSeenAt: number;
}

export interface SoloStats {
  uid: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  gamesPerDifficulty: Record<string, { played: number; wins: number }>;
}

export interface OnlineStats {
  uid: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  points: number;               // cumulative match points scored
  rating: number;               // current ELO
  ratingHistory: { timestamp: number; rating: number }[];
  penaltyPoints: number;        // accumulated penalty for abandoning games
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  rating: number;
  points: number;
  gamesPlayed: number;
  showRating: boolean;
  rank?: number;
}
