export interface roundMoves {
  playerMove: string;
  computerMove: string;
  result: string;
}

export interface PlayerStats {
  username?: string;
  playerPosition?: number;
  gamesPlayed?: number;
  wins: number;
  losses?: number;
}

export interface LeaderboardEntry {
  username: string;
  wins: number;
}

export interface ButtonPosition {
  x: number;
  y: number;
}
