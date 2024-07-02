"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gameController_1 = require("../controllers/gameController");
const gameController_2 = require("../controllers/gameController");
const router = (0, express_1.Router)();
router.post('/play', gameController_1.playGame);
router.post('/reset', gameController_2.resetGame);
exports.default = router;
