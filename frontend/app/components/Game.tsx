import React, { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { IPlayer } from "../../../backend/models/Player";
import "../styles/games.scss";
import rock from "../assets/icons8-fist-96.png";
import paper from "../assets/icons8-hand-96.png";
import scissors from "../assets/icons8-hand-scissors-96.png";

interface ButtonPosition {
  x: number;
  y: number;
}

const Game = () => {
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [computerMove, setComputerMove] = useState<string>("");
  const [playerMove, setPlayerMove] = useState<string>("");
  const [playerInfos, setPlayerInfos] = useState<IPlayer | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [rockButtonPosition, setRockButtonPosition] = useState<ButtonPosition>({ x: 0, y: 0 });
  const [paperButtonPosition, setPaperButtonPosition] = useState<ButtonPosition>({ x: 0, y: 0 });
  const [scissorsButtonPosition, setScissorsButtonPosition] = useState<ButtonPosition>({ x: 0, y: 0 });

  const buttonRockRef = useRef<HTMLButtonElement>(null);
  const buttonPaperRef = useRef<HTMLButtonElement>(null);
  const buttonScissorsRef = useRef<HTMLButtonElement>(null);

  const returnDelay = 500;
  const parentOffset = 125;



  const calculateOffset = (buttonRef: React.RefObject<HTMLButtonElement>, parentOffset: number) => {
    const parentRect = buttonRef.current?.parentElement?.getBoundingClientRect();
    const buttonRect = buttonRef.current?.getBoundingClientRect();

    if (parentRect && buttonRect) {
      const offsetX = parentRect.left + parentRect.width / 2 - (buttonRect.left + buttonRect.width / 2);
      const offsetY = parentRect.top + parentRect.height / 2 - (buttonRect.top + buttonRect.height / 2);
      return {
        x: Math.floor(offsetX),
        y: Math.floor(offsetY - parentOffset),
      };
    }

    return { x: 0, y: 0 };
  };



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
      setPlayerMove(move);
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
    if (inputRef.current) {
      setUsername((inputRef.current as HTMLInputElement).value);
      setPlayerInfos({
        username: (inputRef.current as HTMLInputElement).value,
        score: 0,
        streak: 0,
        bestStreak: 0,
        gamePlayed: 0,
        wins: 0,
      }as IPlayer);
    }
  };

  const confirmReset = () => {
    if (window.confirm("Are you sure you want to reset the game? Your progress will be lost.")) {
      handleReset();
    }
  };

  const handleButtonClick = (move: string) => {
    setRockButtonPosition(calculateOffset(buttonRockRef, parentOffset));
    setPaperButtonPosition(calculateOffset(buttonPaperRef, parentOffset));
    setScissorsButtonPosition(calculateOffset(buttonScissorsRef, parentOffset));
    setTimeout(() => {
        setRockButtonPosition({ x: 0, y: 0 });
        setPaperButtonPosition({ x: 0, y: 0 });
        setScissorsButtonPosition({ x: 0, y: 0 });  
    }, returnDelay);
  };

  return (
    <div className="gameMain">
      {!username && (
        <form
        className="formUsername"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleStart(inputRef.current?.value as string);
            }}
          >
            <input
            type="text"
            ref={inputRef}
            placeholder="Enter your username"
            required
            minLength={3} // Add minLength attribute to enforce 3 character minimum
            maxLength={15} // Add maxLength attribute to enforce 15 character maximum
            className="inputUsername"
            />
            <button type="submit" className="buttons">Valider</button>
          </form>
          )}

          {username && (
          <>
            <div className="btnMoves">
            <button
              className="btnRock"
              data-move={computerMove}
              data-result={result}
              ref={buttonRockRef}
              style={{
              transform:
                (computerMove !== playerMove && computerMove === "rock") ||
                (computerMove !== playerMove && playerMove === "rock")
                ? `translate(${rockButtonPosition.x}px, ${rockButtonPosition.y}px)`
                : "none",
              transition:
                (computerMove !== playerMove && computerMove === "rock") ||
                (computerMove !== playerMove && playerMove === "rock")
                ? "transform 500ms"
                : "none",
              }}
              onClick={() => {
                handlePlay("rock");
                handleButtonClick("rock");
              }}
            >
              <Image src={rock} alt="rock button" />
            </button>
            <button
              className="btnPaper"
              data-move={computerMove}
              data-result={result}
              ref={buttonPaperRef}
              style={{
                transform:
                  (computerMove !== playerMove && computerMove === "paper") ||
                  (computerMove !== playerMove && playerMove === "paper")
                    ? `translate(${paperButtonPosition.x}px, ${paperButtonPosition.y}px)`
                    : "none",
                transition:
                  (computerMove !== playerMove && computerMove === "paper") ||
                  (computerMove !== playerMove && playerMove === "paper")
                    ? "transform 500ms"
                    : "none",
              }}
              onClick={() => {
                handlePlay("paper");
                handleButtonClick("paper");
              }}
            >
              <Image src={paper} alt="paper button" />
            </button>
            <button
              className="btnScissors"
              data-move={computerMove}
              data-result={result}
              ref={buttonScissorsRef}
              style={{
                transform:
                  (computerMove !== playerMove &&
                    computerMove === "scissors") ||
                  (computerMove !== playerMove && playerMove === "scissors")
                    ? `translate(${scissorsButtonPosition.x}px, ${scissorsButtonPosition.y}px)`
                    : "none",
                transition:
                  (computerMove !== playerMove &&
                    computerMove === "scissors") ||
                  (computerMove !== playerMove && playerMove === "scissors")
                    ? "transform 500ms"
                    : "none",
              }}
              onClick={() => {
                handlePlay("scissors");
                handleButtonClick("scissors");
              }}
            >
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
          <button className="buttons" onClick={() => confirmReset()}>
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default Game;
