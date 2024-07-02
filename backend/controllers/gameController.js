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
exports.playGame = void 0;
const Player_1 = __importDefault(require("../models/Player"));
const playGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, move, streak } = req.body;
    let prevMove = 0;
    const choices = ['rock', 'paper', 'scissors'];
    const computerMove = choices[Math.floor(Math.random() * 3)];
    let result;
    if (move === computerMove) {
        result = 'draw';
    }
    else if ((move === 'rock' && computerMove === 'scissors') ||
        (move === 'paper' && computerMove === 'rock') ||
        (move === 'scissors' && computerMove === 'paper')) {
        result = 'win';
    }
    else {
        result = 'lose';
    }
    let player = yield Player_1.default.findOne({ username });
    if (!player) {
        player = new Player_1.default({ username, score: 0, streak: 0});
    }
    if (result === 'win') {
        player.score += 1;
        if (player.streak === 0 || prevMove === 1) { player.streak += 1; prevMove = 1; };
    }
    else if (result === 'lose') {
        player.score -= 1;
        prevMove = 0;
        player.streak = 0;
    }
   
    yield player.save();
    res.json({ result, computerMove, score: player.score, streak: player.streak});
});
exports.playGame = playGame;
