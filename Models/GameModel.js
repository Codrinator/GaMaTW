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


const getGamesCollectionSub = async function(noOfItems){
    const query = Game.find();
    query.sort({popularity: -1}).limit(noOfItems);
    return query.exec();
};

const getGamesCollection = async function(noOfItems, category){
    const query = Game.find();
    query.where({category: category}).limit(noOfItems);
    return query.exec();
};

const loadGames = async function(noOfItems=20, categorie, genre, switcher = 0){
    
    if(switcher === 1){
    const query = Game.find();
    query.where({categorie: categorie, genre:genre}).limit(noOfItems);
    return query.exec();
    }
    else{
    const query = Game.find();
    query.sort({popularity: -1}).limit(noOfItems);
    return query.exec();
    }
};

const getNewGames = async function(){
    const query=Game.find();
    query.sort({release_date: -1}).limit(5);
    return query.exec();
};

const getNewGamesRssFeed=async function(){
    const query=Game.find();
    query.sort({release_date: -1}).limit(10);
    return query.exec();
};


const Game = mongoose.model('GameCollection', GameSchema);

module.exports = {Game, getTopGames, getNewGamesRssFeed, getNewGames, loadGames, getGamesCollection, getGamesCollectionSub};

