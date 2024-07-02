import { Request, Response } from 'express';
import Player from '../models/Player';

export const getLeaderboard = async (req: Request, res: Response) => {
  const topPlayers = await Player.find().sort({ score: -1 }).limit(10);
  res.json(topPlayers);
};
