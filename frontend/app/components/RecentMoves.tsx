import React from "react";
import "../styles/leaderboard.scss";
import { roundMoves } from "../types";

interface RecentMovesProps {
  updatedLast10moves: roundMoves[];
}

const RecentMoves: React.FC<RecentMovesProps> = ({ updatedLast10moves }) => {
  return (
    <div className="mainLeaderboard">
      <div className="titleWrapper">
        <h2>Recent Moves</h2>
      </div>
      <table className="leaderboardTable recentMovesTable">
        <thead>
          <tr>
            <th>Player</th>
            <th>Computer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {updatedLast10moves.map((round, index) => (
            <tr key={index}>
              <td>{round.playerMove}</td>
              <td>{round.computerMove}</td>
              <td data-result={round.result}>{round.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentMoves;
