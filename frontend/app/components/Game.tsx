import React, { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { IPlayer } from "../../../backend/models/Player";
import "../styles/games.scss";
import rock from "../assets/icons8-fist-96.png";
import paper from "../assets/icons8-hand-96.png";
import scissors from "../assets/icons8-hand-scissors-96.png";

const Game = () => {
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [computerMove, setComputerMove] = useState<string>("");
  const [playerInfos, setPlayerInfos] = useState<IPlayer | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePlay = async (move: string) => {
    try {
  
      // Send username and move to the backend
      const response = await axios.post("http://localhost:5000/api/game/play", {
        username,
        move,
      });
      // Update the result
      setResult(
        `You ${response.data.result}. Computer chose ${response.data.computerMove}.`
      );
      setResult(response.data.result);
      setComputerMove(response.data.computerMove);
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
        username: "", 
        score: 0,
        streak: 0,
        bestStreak: 0,
        gamePlayed: 0,
        wins: 0,
      } as IPlayer);
      setResult("restart");
      setUsername("");
      if (inputRef.current) {
        (inputRef.current as any).value = ""; // Empty the input
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStart = (uname: string) => {
    // Check if the username is at least 3 characters long
    if (uname.length < 3 || uname.length > 16) {
      console.log(uname.length)
      alert("Username must be between 3 and 16 characters long");
      return;
    }
    if (inputRef.current) {
      setUsername((inputRef.current as HTMLInputElement).value);
      setPlayerInfos({
        username: (inputRef.current as HTMLInputElement).value,
        score: 0,
        streak: 0,
        bestStreak: 0,
        gamePlayed: 0,
        wins: 0,
      })
    }
  };

  const confirmReset = () => {
    if (window.confirm("Are you sure you want to reset the game? Your progress will be lost.")) {
      handleReset();
    }
  };


  return (
    <div className="gameMain">
      {!username && (
        <>
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter your username"
        required
        className="inputUsername"
      />      
      <button onClick={(e) =>  handleStart(inputRef.current?.value as string) }>Valider</button>
      </>
      )}

      {username && (
        <>
              <div className="btnMoves">
        <button onClick={() => handlePlay("rock")}>
          <Image src={rock} alt="rock button" />
        </button>
        <button onClick={() => handlePlay("paper")}>
          <Image src={paper} alt="paper button" />
        </button>
        <button onClick={() => handlePlay("scissors")}>
          <Image src={scissors} alt="scissors button" />
        </button>
      </div>
         {result !== "restart" && (
          <div className="resultDisplay">
            <p data-result={result}>You {result}</p>
            <p>Computer chose {computerMove}</p>
          </div>
         )}
          <div className="stats">
            <div>
              <p>Score : {playerInfos?.score}</p>
              <span>|</span>
              <p>
                Streak : {playerInfos?.streak} (Best : {playerInfos?.bestStreak}
                )
              </p>
            </div>

            <div>
              <p>
                Wins : {playerInfos?.wins}/{playerInfos?.gamePlayed} (
                {playerInfos?.wins && playerInfos?.gamePlayed
                  ? (
                      (playerInfos?.wins / playerInfos?.gamePlayed) *
                      100
                    ).toFixed(2)
                  : 0}
                %)
              </p>
            </div>
          </div>
          <button className="resetButton" onClick={() => confirmReset()}>
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default Game;
