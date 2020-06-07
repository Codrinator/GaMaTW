const Game = require('../Models/index').Game;
const ejs = require('ejs');

const loadCollection = async function(req, res){
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
}

module.exports = {loadCollection};