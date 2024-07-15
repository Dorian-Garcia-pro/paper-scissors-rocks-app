export interface roundMoves {
  playerMove: string;
  computerMove: string;
  result: string;
}

export interface PlayerStats {
  username?: string;
  playerPosition?: number;
  playerName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
}

export interface LeaderboardEntry {
  playerName: string;
  wins: number;
}

export interface ButtonPosition {
  x: number;
  y: number;
}
