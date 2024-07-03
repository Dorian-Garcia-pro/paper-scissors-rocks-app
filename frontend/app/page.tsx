"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

export default function Home() {
  return (
    <main className={styles.main}>
{/*       <h1>Paper-Scissors-Rocks Game</h1> */}
<div></div>
      <Game />
      <Leaderboard />
    </main>
  );
}
