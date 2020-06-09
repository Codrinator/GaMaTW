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
        const regexNumber = /^[0-9]+$/;
        const regexDate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
        const descriptionRegex = /^[a-zA-Z0-9,.!? ]*$/;
        const arrayRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

        const price = req.body.price;
        const release_date = req.body.release_date;
        const name = req.body.name;
        const company = req.body.company;
        const requestGenre = req.body.genres;
        const category = req.body.category;
        const age_restriction = req.body.age_restriction;
        const requestPlatform = req.body.platform;
        const game_description = req.body.description;
        const genre = requestGenre.split(" ");
        const platform = requestPlatform.split(" ");
        if (arrayRegex.test(name) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Name cannot contain special characters'
            }));
        } else if (age_restriction.toLocaleString() !== 'G' && age_restriction.toLocaleString() !== 'PG' && age_restriction.toLocaleString() !== 'PG-13' && age_restriction.toLocaleString() !== 'R' && age_restriction.toLocaleString() !== 'NC-17') {
            res.end(JSON.stringify({
                success: false,
                status: 'Age restrictions: G, PG, PG-13, R, NC-17'
            }));
        } else if (arrayRegex.test(company) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Company cannot contain special characters'
            }));
        } else if (arrayRegex.test(requestGenre) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Genres cannot contain special characters or be null'
            }));
        } else if (category.toLocaleString()!=='board' && category.toLocaleString() !=='digital') {
            res.end(JSON.stringify({
                success: false,
                status: 'Categories: board / digital'
            }));
        } else if (arrayRegex.test(requestPlatform) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Platforms cannot contain special characters or be null'
            }));
        } else if (regexDate.test(release_date) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Wrong date format'
            }));
        } else if (descriptionRegex.test(game_description) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Description contains not allowed characters'
            }));
        } else if (regexNumber.test(price) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Price has to be a number'
            }));
        } else {
            Game.Game({
                name: name,
                release_date: release_date,
                company: company,
                genre: genre,
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