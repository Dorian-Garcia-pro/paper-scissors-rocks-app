# Paper-Scissors-Rocks Game

## Introduction
This project is a web application built using TypeScript, React, Next.js, and Node.js that allows players to play a paper-scissors-rocks game. The application also includes a leaderboard that displays the top 10 players and is persisted in a MongoDB database.

## Features
- Players can enter their usernames to start playing.
- The game tracks and updates the player's score after each round.
- A leaderboard shows the top 10 players with their usernames and scores.
- A reset button allows players to start a new game.
- The user interface is visually appealing and easy to use.
- The game logic is developed in the backend API.

## Technologies Used
- Frontend: TypeScript, React, Next.js
- Backend: TypeScript, Node.js, Express
- Database: MongoDB

## Prerequisites
- Node.js and npm installed on your machine.
- MongoDB instance (local or cloud-based).

## Setup Instructions

## Backend Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Dorian-Garcia-pro/paper-scissors-rocks-app.git
cd paper-scissors-rocks-app
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory of the project and add the following variables:

```plaintext
MONGO_URI=<your_mongodb_uri>
PORT=<your_mongodb_port_default_5000>
```

Replace `<your_mongodb_uri>` with the connection string for your MongoDB instance.
Replace `<your_mongodb_port_default_5000>` with the port for your MongoDB instance (default : 5000).

### 4. Compile TypeScript
```bash
npx tsc
```

### 5. Start the backend server
```bash
node dist/server.js
```

## Frontend Setup

### 1. Navigate to the frontend directory
```bash
cd ../frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the frontend development server
```bash
npm run dev
```

### 4. Play
The backend server should be running at http://localhost:5000.

The frontend development server should be running at http://localhost:3000.

Open http://localhost:3000 in your browser to play the game and view the leaderboard.


## API Endpoints

### Game API

* POST /api/game/play

Request body : {username, move}

Response: {result,computerMove, score, streak, bestStreak, gamePlayed, wins}

* POST /api/game/reset

Request body : {username}

Response: { message: "Game reset" }

### Leaderboard API
* GET /api/leaderboard

Response: [{ "username": "player1", "score": 10 }, { "username": "player2", "score": 8 }, ...]