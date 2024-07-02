import { Request, Response } from "express";
import Player from "../models/Player";

// Play a game
export const playGame = async (req: Request, res: Response) => {
  const { username, move } = req.body;
  const choices = ["rock", "paper", "scissors"];
  const computerMove = choices[Math.floor(Math.random() * 3)];

  let prevMove: string = "";
  let result: string;

  // Determine the result of the game
  if (move === computerMove) {
    result = "draw";
  } else if (
    (move === "rock" && computerMove === "scissors") ||
    (move === "paper" && computerMove === "rock") ||
    (move === "scissors" && computerMove === "paper")
  ) {
    result = "win";
  } else {
    result = "lose";
  }

  // Find player by username
  let player = await Player.findOne({ username });

  // Create a new player if one doesn't exist
  if (!player) {
    player = new Player({
      username,
      score: 0,
      streak: 0,
      bestStreak: 0,
      gamePlayed: 0,
      wins: 0,
    });
  }

  // Update player's stats
  if (result === "win") {
    player.score += 1;
    player.wins += 1;
    // Check if the previous move was a win to increment the streak
    if (prevMove === "win" || prevMove === "") {
      player.streak += 1;
      if (player.streak > player.bestStreak) {
        player.bestStreak = player.streak;
      }
    }
  } else if (result === "lose") {
    player.score -= 1;
    player.streak = 0;
  } else {
    player.streak = 0;
  }

  // Increment the number of games played
  player.gamePlayed += 1;

  // Save previous move
  prevMove = result;

  // Save players stats
  await player.save();

  // Send the result back to the client
  res.json({
    result,
    computerMove,
    score: player.score,
    streak: player.streak,
    bestStreak: player.bestStreak,
    gamePlayed: player.gamePlayed,
    wins: player.wins,
  });
};

// Reset the player's stats
export const resetGame = async (req: Request, res: Response) => {
  const { username } = req.body;
  let player = await Player.findOne({ username });

  // Check if the player exists and set stats to 0
  if (!player) {
    return res.status(404).json({ message: "Player not found" });
  } else {
    player.score = 0;
    player.streak = 0;
    player.bestStreak = 0;
    player.gamePlayed = 0;
    await player.save();
  }

  res.json({ message: "Game reset" });
};
