import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leaderboard');
      setPlayers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <div className="titleWrapper"><h2>Leaderboard</h2> <button onClick={() => fetchLeaderboard()}>refresh</button></div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Streak</th>
            <th>Best Streak</th>
            <th>Games Played</th>
            <th>Win rate</th>
     
          </tr>
        </thead>
        <tbody>
          {players.map((player: any, index: number) => (
            <tr key={player._id}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
              <td>{player.streak}</td>
              <td>{player.bestStreak}</td>
              <td>{player.gamePlayed}</td>
              <td>{player.wins && player.gamePlayed ? ((player.wins / player.gamePlayed) * 100).toFixed(2) : 0}%</td>

                  </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Leaderboard;
