const Game = require('../Models/index').Game;

const insertGame = async function insertGame(req, res) {
    
    const name= req.body.name;
    const company= req.body.company;
    const genres= req.body.genres;
    const price=req.body.price;
    const category= req.body.category;
    const release_date = req.body.release_date;
    const age_restriction= req.body.age_restriction;
    const platform= req.body.platform;
    const game_description= req.body.description;

    Game.Game({
        name: name,
        release_date:release_date,
        company:company,
        genres:genres,
        price:price,
        category:category,
        age_restriction:age_restriction,
        platform:platform,
        game_description:game_description
    }).save(function (err) {
        if (err) throw err;
        res.end(JSON.stringify({
            success: true,
            status: 'Register complete'
        }))
    });
};

module.exports = {insertGame};