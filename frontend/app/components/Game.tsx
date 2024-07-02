import React, { useState } from "react";
import axios from "axios";
import { IPlayer } from "../../../backend/models/Player";

const Game = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [playerInfos, setPlayerInfos] = useState<IPlayer>();

  const handlePlay = async (move: string) => {
    try {
      // Check if the username is at least 3 characters long
      if (username.length < 3) {
        alert("Username must be at least 3 characters long");
        return;
      }
      // Send username and move to the backend
      const response = await axios.post("http://localhost:5000/api/game/play", {
        username,
        move,
      });
      // Update the result
      setResult(
        `You ${response.data.result}. Computer chose ${response.data.computerMove}.`
      );
      // Update the player's stats
      setPlayerInfos(response.data as IPlayer);
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
        score: 0,
        streak: 0,
        bestStreak: 0,
        gamePlayed: 0,
        wins: 0,
      } as IPlayer);
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
