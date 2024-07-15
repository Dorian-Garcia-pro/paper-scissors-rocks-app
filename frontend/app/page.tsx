"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
// Import components
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import RecentMoves from "./components/RecentMoves";
// Import types
import { MAX_RECENTMOVES_ENTRIES, MAX_LEADERBOARD_ENTRIES } from "./var";
import { roundMoves, PlayerStats } from "./types";

export default function Home() {
  const [last10moves, setLast10moves] = useState<roundMoves[]>(
    Array(10).fill({ playerMove: "-", computerMove: "-", result: "-" })
  );
  const [playerStats, setPlayerStats] = useState<PlayerStats>();
  const [leaderboard, setLeaderboard] = useState(
    Array(MAX_LEADERBOARD_ENTRIES).fill({
      username: "-",
      score: "-",
      streak: "-",
      bestStreak: "-",
      gamePlayed: "-",
      wins: "-",
    })
  );

  // Fetch the leaderboard when the component mounts
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Fetch the leaderboard from the backend
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leaderboard");
      setLeaderboard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add the latest round to the recent moves
  const updateLast10moves = (round: roundMoves) => {
    setLast10moves((prevMoves) => {
      const newMoves = [round, ...prevMoves];
      if (newMoves.length > MAX_RECENTMOVES_ENTRIES) {
        newMoves.pop(); // Ensure the array doesn't exceed 10 items
      }
      return newMoves;
    });
  };

  // Merge the player's username with the playerStats object
  const updatePLayerStats = (infos: any, username?: string) => {
    const updatedInfos = { ...infos, username };
    setPlayerStats(updatedInfos);
  };

  // Update the leaderboard with the latest player position
  const updateLeaderboard = async () => {
    try {
      // Fetch the latest leaderboard data
      await fetchLeaderboard();

      // Calculate player's index in the updated leaderboard
      const playerIndex =
        leaderboard.findIndex(
          (player: any) => player.username === playerStats?.username
        ) + 1;

      // Update playerStats with the latest player position
      setPlayerStats((prevStats: any) => ({
        ...prevStats,
        playerPosition: playerIndex,
      }));

      // Log updated playerStats (this may not log the updated state immediately due to React's asynchronous nature)
      console.log(playerStats);
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
  };

  return (
    <main className={styles.main}>
      <RecentMoves updatedLast10moves={last10moves} />
      <Game
        updatePLayerStats={updatePLayerStats}
        updateLeaderboard={updateLeaderboard}
        updateLast10moves={updateLast10moves}
        setLast10moves={setLast10moves}
      />
      <Leaderboard playerStats={playerStats} leaderboard={leaderboard} />
    </main>
  );
}