"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetGame = exports.playGame = void 0;
const Player_1 = __importDefault(require("../models/Player"));
// Play a game
const playGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, move } = req.body;
    const choices = ["rock", "paper", "scissors"];
    const computerMove = choices[Math.floor(Math.random() * 3)];
    let prevMove = "";
    let result;
    // Determine the result of the game
    if (move === computerMove) {
        result = "draw";
    }
    else if ((move === "rock" && computerMove === "scissors") ||
        (move === "paper" && computerMove === "rock") ||
        (move === "scissors" && computerMove === "paper")) {
        result = "win";
    }
    else {
        result = "lose";
    }
    // Find player by username
    let player = yield Player_1.default.findOne({ username });
    // Create a new player if one doesn't exist
    if (!player) {
        player = new Player_1.default({
            username,
            score: 0,
            streak: 0,
            bestStreak: 0,
            gamePlayed: 0,
            wins: 0,
        });
    }
    // Update player's stats
    if (result === "win") {
        player.score += 1;
        player.wins += 1;
        // Check if the previous move was a win to increment the streak
        if (prevMove === "win" || prevMove === "") {
            player.streak += 1;
            if (player.streak > player.bestStreak) {
                player.bestStreak = player.streak;
            }
        }
    }
    else if (result === "lose") {
        player.score -= 1;
        player.streak = 0;
    }
    else {
        player.streak = 0;
    }
    // Increment the number of games played
    player.gamePlayed += 1;
    // Save previous move
    prevMove = result;
    // Save players stats
    yield player.save();
    // Send the result back to the client
    res.json({
        result,
        computerMove,
        score: player.score,
        streak: player.streak,
        bestStreak: player.bestStreak,
        gamePlayed: player.gamePlayed,
        wins: player.wins,
    });
});
exports.playGame = playGame;
// Reset the player's stats
const resetGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    // Find player by username
    let player = yield Player_1.default.findOne({ username });
    // Check if the player exists and set stats to 0
    if (!player) {
        return res.status(404).json({ message: "Player not found" });
    }
    else {
        player.score = 0;
        player.streak = 0;
        player.bestStreak = 0;
        player.gamePlayed = 0;
        player.wins = 0;
        yield player.save();
    }
    res.json({ message: "Game reset" });
});
exports.resetGame = resetGame;
