import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/leaderboard.scss";
import Image from "next/image";
import refresh from "../assets/icons8-rafraîchir-30.png";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  // Fetch the leaderboard from the backend
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leaderboard");
      setPlayers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the leaderboard when the component mounts
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="mainLeaderboard">
      <div className="titleWrapper">
        <h2>Leaderboard</h2>
        <button onClick={() => fetchLeaderboard()}>
          <Image src={refresh} alt="refresh" width={20} height={20} />
        </button>
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
          {players.map((player: any, index: number) => (
            <tr key={player._id}>
              <td className="tdCentered">{index + 1}</td>
              <td>{player.username}</td>
              <td className="tdCentered">{player.score}</td>
 {/*              <td className="tdCentered">{player.streak}</td> */}
              <td className="tdCentered">{player.bestStreak}</td>
              <td className="tdCentered">{player.gamePlayed}</td>
              <td>
                {player.wins && player.gamePlayed
                  ? ((player.wins / player.gamePlayed) * 100).toFixed(2)
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
