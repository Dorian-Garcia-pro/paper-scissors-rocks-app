import React, { useState } from "react";
import axios from "axios";

const Game = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [playerInfos, setPlayerInfos] = useState<PlayerInfos>();

  interface PlayerInfos {
    username?: string;
    score?: number;
    streak?: number;
    bestStreak?: number;
    gamePlayed?: number;
    wins?: number;
  }

  const handlePlay = async (moveClick: string) => {
    try {
      if (username === "") {
        alert("Username is empty");
        return;
      }
      const response = await axios.post("http://localhost:5000/api/game/play", {
        username,
        move: moveClick,
      });
      setResult(
        `You ${response.data.result}. Computer chose ${response.data.computerMove}.`
      );
      setPlayerInfos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/game/reset",
        { username }
      );
      setPlayerInfos({
        ...playerInfos,
        score: 0,
        streak: 0,
        bestStreak: 0,
        gamePlayed: 0,
        wins: 0,
      });
      setResult("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        required
      />
      <br></br>
      <button onClick={() => handlePlay("rock")}>Rock</button>
      <button onClick={() => handlePlay("paper")}>Paper</button>
      <button onClick={() => handlePlay("scissors")}>Scissors</button>
      {playerInfos && (
        <>
          <p>{result}</p>
          <p>Your score: {playerInfos.score}</p>
          <p>Streak: {playerInfos.streak}</p>
          <p>Best streak : {playerInfos.bestStreak}</p>
          <p>gamePlayed : {playerInfos.gamePlayed}</p>
          <p>Wins : {playerInfos.wins}</p>
          <p>
            Win percentage :
            {playerInfos.wins && playerInfos.gamePlayed
              ? ((playerInfos.wins / playerInfos.gamePlayed) * 100).toFixed(2)
              : 0}
            %
          </p>
          <button onClick={() => handleReset()}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Game;
