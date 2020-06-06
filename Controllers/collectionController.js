const Game = require('../Models/index').Game;

const loadCollection = async function loadCollection(req, res){
    const noOfItems = req.body.noOfItems;
    const gamesArray = await Game.loadGames(noOfItems); //wait for it
    res.end(JSON.stringify({
        success: true,
        games: gamesArray
    }));

    //parametrii ^ sunt hard-codati, nu ii verific
}

module.exports = {loadCollection};