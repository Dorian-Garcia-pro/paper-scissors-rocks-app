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

interface roundMoves {
  playerMove: string;
  computerMove: string;
  result: string;
}

interface GameProps {
  updateLast10moves: (round: roundMoves) => void;
}


const Game: React.FC<GameProps> = ({ updateLast10moves }) => {
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [computerMove, setComputerMove] = useState<string>("");
  const [playerMove, setPlayerMove] = useState<string>("");
  const [playerInfos, setPlayerInfos] = useState<IPlayer | undefined>();

  // Refs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRockRef = useRef<HTMLButtonElement>(null);
  const buttonPaperRef = useRef<HTMLButtonElement>(null);
  const buttonScissorsRef = useRef<HTMLButtonElement>(null);

  // Button position states
  const [rockButtonPosition, setRockButtonPosition] = useState<ButtonPosition>({ x: 0, y: 0 });
  const [paperButtonPosition, setPaperButtonPosition] = useState<ButtonPosition>({ x: 0, y: 0 });
  const [scissorsButtonPosition, setScissorsButtonPosition] = useState<ButtonPosition>({ x: 0, y: 0 });

// Clash animation parameters
  const returnDelay = 400;
  const parentOffset = 125;
  
  const calculateOffset = (buttonRef: React.RefObject<HTMLButtonElement>, parentOffset: number) => {
    // Save the parent and button's bounding rectangles (coordinates and dimensions)
    const parentRect = buttonRef.current?.parentElement?.getBoundingClientRect();
    const buttonRect = buttonRef.current?.getBoundingClientRect();

    // If both rectangles are available, calculate where the center of the button is relative to the center of the parent
    if (parentRect && buttonRect) {
      const offsetX = parentRect.left + parentRect.width / 2 - (buttonRect.left + buttonRect.width / 2);
      const offsetY = parentRect.top + parentRect.height / 2 - (buttonRect.top + buttonRect.height / 2);
      // Return the coordinates of the offset
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
      // Update list of last 10 moves    
      updateLast10moves({
        playerMove: move,
        computerMove: response.data.computerMove,
        result: response.data.result,
      })  


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
      setResult("");
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
      setComputerMove("");
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
    // Calculate the offset for each button
    setRockButtonPosition(calculateOffset(buttonRockRef, parentOffset));
    setPaperButtonPosition(calculateOffset(buttonPaperRef, parentOffset));
    setScissorsButtonPosition(calculateOffset(buttonScissorsRef, parentOffset));
    // Reset the button positions after a delay
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
            minLength={3} 
            maxLength={15}
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
              data-computerMove={computerMove}
              data-result={result}
              data-playermove={playerMove}
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
                ? `transform ${returnDelay}ms`	
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
              data-computerMove={computerMove}
              data-result={result}
              data-playermove={playerMove}

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
                  ? `transform ${returnDelay}ms`	
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
              data-computerMove={computerMove}
              data-result={result}
              data-playermove={playerMove}
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
                  ? `transform ${returnDelay}ms`	
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
          {result !== "" && (
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
