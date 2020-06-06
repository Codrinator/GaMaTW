const Game = require('../Models/index').Game;
const User=require('../Models/index').User;

const loadCollection = async function loadCollection(req, res) {
    const noOfItems = req.body.noOfItems;
    const gamesArray = await Game.loadGames(noOfItems);
    res.end(JSON.stringify({
        success: true,
        games: gamesArray
    }));

};

const getStatistic = async function getStatistic(req, res) {
    const newGames = await Game.getNewGames();
    const topGames = await Game.getTopGames();
    const numberOfGames= await Game.getNumberOfGames();
    const countUsers = await User.countUsers();
    res.end(JSON.stringify({
        success: true,
        newGames: newGames,
        topGames: topGames,
        numberOfGames: numberOfGames,
        numberOfUsers: countUsers
    }))
};

module.exports = {loadCollection,getStatistic};