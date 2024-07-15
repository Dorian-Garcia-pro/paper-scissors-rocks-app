import React, { useEffect, useState } from "react";
import "../styles/leaderboard.scss";
import { MAX_LEADERBOARD_ENTRIES } from "../var";
import { PlayerStats, LeaderboardEntry } from "../types";

interface LeaderboardProps {
  playerStats: PlayerStats;
  leaderboard: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  playerStats,
  leaderboard,
}) => {
  return (
    <div className="mainLeaderboard">
      <div className="titleWrapper">
        <h2>Leaderboard</h2>
      </div>
      <table className="leaderboardTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Streak</th>
            <th>Best Streak</th>
            <th>Games</th>
            <th>Win rate</th>
          </tr>
        </thead>
        <tbody>
          {/* Display the player's stats at the top of the leaderboard */}
          {playerStats &&
            leaderboard
              .filter((u) => u.username === playerStats.username)
              .map((player: any, index: number) => (
                <tr
                  key={player._id}
                  className={
                    player.username === playerStats.username ? "highlight" : ""
                  }
                >
                  <td className="tdCentered">{playerStats.playerPosition}</td>
                  <td>
                    {player.username.length > 8
                      ? `${player.username.slice(0, 8)}...`
                      : player.username}
                  </td>
                  <td className="tdCentered">{player.score}</td>
                  <td className="tdCentered">{player.streak}</td>
                  <td className="tdCentered">{player.bestStreak}</td>
                  <td className="tdCentered">{player.gamePlayed}</td>
                  <td>
                    {player.wins && player.gamePlayed
                      ? ((player.wins / player.gamePlayed) * 100).toFixed(1)
                      : 0}
                    %
                  </td>
                </tr>
              ))}
          {/* // Display the rest of the leaderboard */}
          {leaderboard
            .slice(0, MAX_LEADERBOARD_ENTRIES)
            .map((player: any, index: number) => (
              <tr
                key={player._id}
                className={
                  playerStats && player.username === playerStats.username
                    ? "highlight"
                    : ""
                }
              >
                <td className="tdCentered">{index + 1}</td>
                <td>
                  {player.username.length > 8
                    ? `${player.username.slice(0, 8)}...`
                    : player.username}
                </td>
                <td className="tdCentered">{player.score}</td>
                <td className="tdCentered">{player.streak}</td>
                <td className="tdCentered">{player.bestStreak}</td>
                <td className="tdCentered">{player.gamePlayed}</td>
                <td>
                  {player.wins && player.gamePlayed
                    ? ((player.wins / player.gamePlayed) * 100).toFixed(1)
                    : 0}
                  %
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
