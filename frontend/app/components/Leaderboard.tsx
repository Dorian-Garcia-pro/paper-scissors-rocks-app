import React, { useEffect, useState } from "react";
import "../styles/leaderboard.scss";

interface LeaderboardProps {
  playerStats : any;
  leaderboard: any;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ playerStats, leaderboard}) => {

  return (
    <div className="mainLeaderboard">
      <div className="titleWrapper">
        <h2>Leaderboard</h2>
        {/*         <button onClick={() => fetchLeaderboard()}>
          <Image src={refresh} alt="refresh" width={20} height={20} />
        </button> */}
      </div>
      <table className="leaderboardTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            {/*             <th>Streak</th> */}
            <th>Best Streak</th>
            <th>Games</th>
            <th>Win rate</th>
          </tr>
        </thead>
        <tbody>
          {playerStats &&
            playerStats.playerPosition > 10 && 
            leaderboard
              .filter((u: any) => u.username === playerStats.username)
              .map((player: any, index: number) => (
                <tr key={player._id}  className={player.username === playerStats.username ? 'highlight' : ''}>
                  <td className="tdCentered">{playerStats.playerPosition}</td>
                  <td>{player.username}</td>
                  <td className="tdCentered">{player.score}</td>
                  {/*<td className="tdCentered">{player.streak}</td> */}
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

          {leaderboard.slice(0, 10).map((player: any, index: number) => (
            <tr key={player._id}  className={playerStats && player.username === playerStats.username ? 'highlight' : ''}>
              <td className="tdCentered">{index + 1}</td>
              <td>{player.username}</td>
              <td className="tdCentered">{player.score}</td>
              {/*              <td className="tdCentered">{player.streak}</td> */}
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
