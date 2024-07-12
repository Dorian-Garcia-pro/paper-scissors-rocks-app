import { Request, Response } from 'express';
import Player from '../models/Player';

export const getLeaderboard = async (req: Request, res: Response) => {
  const topPlayers = await Player.find( {gamePlayed: { $gt: 0 }} )
  .sort({ score: -1 });
  res.json(topPlayers);
};
