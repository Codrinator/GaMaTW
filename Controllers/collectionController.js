const Game = require('../Models/index').Game;
const User = require('../Models/index').User;
const Tournament = require('../Models/index').Tournament;
const ejs = require('ejs');

/*const loadCollection = async function(req, res){
    const categorie = req.body.categorie;
    const genre = req.body.genre;
    const noOfItems = req.body.noOfItems;
    const loadGames = await Game.loadGames(noOfItems, categorie, genre, req.body.switcher );
    ejs.renderFile('./Views/gameCollection.ejs', {loadGames: loadGames}, function (err, str) {
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(str);
            res.end();
        }
    });
}*/

const loadingCollection = async function loadingCollection(req, res){
    const noOfItems = req.body.noOfItems;
    const categorie = req.body.categorie;
    const genre = req.body.genre;
    const totalNoOfGames = await Game.getNumberOfGamesWithParameters(noOfItems, categorie, genre, req.body.switcher, req.body.page);
    const games = await Game.loadGames(noOfItems, categorie, genre, req.body.switcher, req.body.page);
    //console.log(games);
    res.end(JSON.stringify({
       success: true,
       games: games,
       totalNoOfGames: totalNoOfGames 
    }));
};

const getStatistic = async function getStatistic(req, res) {
    const newGames = await Game.getNewGames();
    const topGames = await Game.getTopGames();
    const numberOfGames = await Game.getNumberOfGames();
    const countUsers = await User.countUsers();
    res.end(JSON.stringify({
        success: true,
        newGames: newGames,
        topGames: topGames,
        numberOfGames: numberOfGames,
        numberOfUsers: countUsers
    }))
};

const getCSV = async function getCSV(req, res) {
    const allGames = await Game.getAll();
    const allTournaments = await Tournament.getAll();
    res.end(JSON.stringify({
        success: true,
        allGames: allGames,
        allTournaments: allTournaments
    }))
};

module.exports = {loadingCollection, getStatistic, getCSV};