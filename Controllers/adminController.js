const Game = require('../Models/index').Game;

const deleteGame = async function deleteGame(req, res) {

    if (req.user.payload !== 'admin') {
        res.end(JSON.stringify({
            success: false,
            status: 'You do not have this permission'
        }))
    } else {
        const name = req.body.name;
        const exist = await Game.getByName(name);
        if (exist.length === 0) {
            res.end(JSON.stringify({
                success: false,
                status: 'Game does not exist'
            }));
        } else {
            await Game.removeByName(name);
            res.end(JSON.stringify({
                success: true,
                status: 'Delete complete'
            }))
        }
    }
};

const insertGame = async function insertGame(req, res) {

    if (req.user.payload !== 'admin') {
        res.end(JSON.stringify({
            success: false,
            status: 'You do not have this permission'
        }))
    } else {
        const price = req.body.price;
        const release_date = req.body.release_date;
        const regexNumber = /^[0-9]+$/;
        const regexDate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
        if (regexDate.test(release_date) === false) {
            res.end(JSON.stringify({
                success: 'false',
                status: 'Wrong date Format'
            }));
        } else if (regexNumber.test(price) === false) {
            res.end(JSON.stringify({
                success: 'false',
                status: 'Price has to be a number'
            }));
        } else {

            const name = req.body.name;
            const company = req.body.company;
            const genres = req.body.genres;
            const category = req.body.category;
            const age_restriction = req.body.age_restriction;
            const platform = req.body.platform;
            const game_description = req.body.description;


            Game.Game({
                name: name,
                release_date: release_date,
                company: company,
                genres: genres,
                price: price,
                category: category,
                age_restriction: age_restriction,
                platform: platform,
                game_description: game_description
            }).save(function (err) {
                if (err) throw err;
                res.end(JSON.stringify({
                    success: true,
                    status: 'Register complete'
                }))
            });
        }
    }
};

module.exports = {insertGame, deleteGame};