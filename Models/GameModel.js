const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: String,
    release_date: Date, // 2002-12-09
    company: String,
    popularity: {type: Number, min: 0, max: 100},
    votes: {type: Number, default: 0},
    genre: [String], // fps, shooter, rts
    category: String, // Boardgame / Digital
    age_restriction: String,  // G , PG , PG-13 , R , NC-17
    platform: {type: [String], default: ['-']}, // PS4,PC,XBox etc. or empty for board games
    price: {type: Number, default: 0},
    game_description: String
});

const Game = mongoose.model('GameCollection', GameSchema);


module.exports = {Game};