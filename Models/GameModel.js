const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: String,
    release_date: Date, // 2002-12-09
    company: String,
    popularity: {type: Number, min: 0, max: 100,default: 0},
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

const getByName=async function(name){
    const query=Game.find();
    query.where({name: name});
    return query.exec();
};

const getNumberOfGames= async function(){
    const query= Game.count();
    return query.exec()
};

const loadGames = async function(noOfItems){
    const query = Game.find();
    query.sort({popularity: -1}).limit(noOfItems);
    return query.exec();
};

const getAll=async function(){
    const query=Game.find();
    return query.exec();
};

const getGamesCollection = async function(noOfItems, category){
    const query = Game.find();
    query.where({category: category}).limit(noOfItems);
    return query.exec();
};

const getGamesCollectionSub = async function(noOfItems, category, genre){
    const query = Game.find({genre: genre});
    query.where({category: category}).limit(noOfItems);
    return query.exec();
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

const removeByName=async function(name){
    const query=Game.find();
    query.where({ name:name }).deleteOne();
    query.exec();
};


const Game = mongoose.model('GameCollection', GameSchema);

module.exports = {Game, removeByName,getAll,getTopGames,getByName,getNewGamesRssFeed, getNewGames, loadGames, getGamesCollection, getGamesCollectionSub,getNumberOfGames};

