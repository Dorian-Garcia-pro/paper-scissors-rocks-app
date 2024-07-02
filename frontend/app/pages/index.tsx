import React from 'react';
import Game from '../components/Game';
import Leaderboard from '../components/Leaderboard';

const Home = () => {
  return (
    <div>
      <h1>Paper-Scissors-Rocks Game</h1>
      <Game />
      <Leaderboard />
    </div>
  );
};

export default Home;
