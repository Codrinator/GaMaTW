const Game = require('../Models/index').Game;
const ejs = require('ejs');

const loadCollection = async function loadCollection(req, res){
    const categorie = req.body.categorie;
    const genre = req.body.genre;
    const noOfItems = req.body.noOfItems;
    const loadGames = await Game.loadGames(noOfItems);
    const mainCollection = await Game.getGamesCollection(noOfItems, categorie);
    const subCollection = await Game.getGamesCollectionSub(noOfItems, categorie, genre);
    ejs.renderFile('./Views/gameCollection.ejs', {loadGames: loadGames, mainCollection: mainCollection, subCollection: subCollection}, function (err, str) {
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(str);
            res.end();
        }
    });
}

module.exports = {loadCollection};