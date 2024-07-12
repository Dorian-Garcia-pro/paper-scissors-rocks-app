"use client";
import styles from "./page.module.scss";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import RecentMoves from "./components/RecentMoves";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  interface roundMoves {
    playerMove: string;
    computerMove: string;
    result: string;
  }


  const [last10moves, setLast10moves] = useState<roundMoves[]>([]);
  const [playerStats, setPlayerStats] = useState();
  const [leaderboard, setLeaderboard] = useState([]);

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
  




  const updateLast10moves = (round: roundMoves) => {
    setLast10moves(prevMoves => {
      const newMoves = [round,...prevMoves];
      if (newMoves.length > 10) {
        newMoves.pop(); // Ensure the array doesn't exceed 10 items
      }
      return newMoves;
    });
  }
  
  const updatePLayerStats = (infos : any, username? : any) => {
    const updatedInfos = { ...infos, username };
    setPlayerStats(updatedInfos);
};

const updateLeaderboard = async () => {
  try {
    // Fetch the latest leaderboard data
    await fetchLeaderboard();

    // Calculate player's index in the updated leaderboard
    const playerIndex = leaderboard.findIndex((player: any) => player.username === playerStats?.username) + 1;

    // Update playerStats with the latest player position
    setPlayerStats((prevStats: any) => ({
      ...prevStats,
      playerPosition: playerIndex,
    }));

    // Log updated playerStats (this may not log the updated state immediately due to React's asynchronous nature)
    console.log(playerStats);

  } catch (error) {
    console.error('Error updating leaderboard:', error);
  }
};


 





  return (
    <main className={styles.main}>
      <RecentMoves updatedLast10moves={last10moves} />
      <Game updateLast10moves={updateLast10moves} updatePLayerStats={updatePLayerStats} updateLeaderboard={updateLeaderboard} />
      <Leaderboard playerStats={playerStats} leaderboard={leaderboard} />
    </main>
  );
}