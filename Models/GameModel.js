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

const getTopGames = async function () {
    const query = Game.find();
    query.sort({popularity: -1}).limit(10);
    return query.exec();
};

const loadGames = async function(no_of_items){
    const query = Game.find();
    query.sort({popularity: -1}).limit(no_of_items);
    return query.exec();
};

const getGamesCollection = async function(no_of_items, category){
    const query = Game.find();
    query.where({category: category}).limit(no_of_items);
    return query.exec();
};

const getGamesCollectionSub = async function(no_of_items, category, genre){ //atentie poate crapa aici, vezi oleaca man
    const query = Game.find({genre: genre});
    query.where({category: category}).limit(no_of_items);
    return query.exec();
};


const Game = mongoose.model('GameCollection', GameSchema);


module.exports = {Game, getTopGames, loadGames, getGamesCollection, getGamesCollectionSub};