const Game = require('../Models/index').Game;

const loadCollection = async function loadCollection(req, res){
    const no_of_items = req.body.no_of_items;
  //  const criteria = req.body.criteria;
    const gamesArray = await Game.loadGames(no_of_items); //wait for it

    res.end(JSON.stringify({
        succes: true,
        games: gamesArray
    }));

    //parametrii ^ sunt hard-codati, nu ii verific
}

module.exports = {loadCollection};