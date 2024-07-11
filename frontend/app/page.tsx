"use client";
import styles from "./page.module.scss";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import RecentMoves from "./components/RecentMoves";
import { useState } from "react";

export default function Home() {
  interface roundMoves {
    playerMove: string;
    computerMove: string;
    result: string;
  }

  const [last10moves, setLast10moves] = useState<roundMoves[]>([]);


  const updateLast10moves = (round: roundMoves) => {
    // Use setLast10moves to update the state
    setLast10moves(prevMoves => {
      const newMoves = [round,...prevMoves];
      if (newMoves.length > 10) {
        newMoves.pop(); // Ensure the array doesn't exceed 10 items
      }
      return newMoves;
    });
  }




  return (
    <main className={styles.main}>
      <RecentMoves updatedLast10moves={last10moves} />
      <Game updateLast10moves={updateLast10moves} />
      <Leaderboard />
    </main>
  );
}