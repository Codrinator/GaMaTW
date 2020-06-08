const Tournament = require('../Models/index').Tournament;
const Game = require('../Models/index').Game;

const createTournament = async function (req, res) {
    try {
        const username = req.body.payload;
        const name = req.body.name;
        const max_number_participants = req.body.max_number_participants;
        const game = req.body.game;
        const matches = [];

        const arrayRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

        if (arrayRegex.test(name) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Name cannot contain special characters'
            }));
        } else if (await Game.getByName(game).length === 0) {
            res.end(JSON.stringify({
                success: false,
                status: 'Game not existent in our database'
            }));
        } else {
            for (let i = 0; i < max_number_participants; i++) {
                matches.push({participantOne: "TBD", participantTwo: "TBD"});
            }

            Tournament.Tournament({
                name: name,
                owner: username,
                max_number_participants: max_number_participants,
                game: game,
                state: true,
                joinable: true,
                participants: [],
                match_winner: [],
                matches: matches
            }).save(function (err) {
                if (err) throw err;
                res.end(JSON.stringify({
                    success: true,
                    status: 'Tournament registered successfully'
                }))
            });
        }
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify({
            success: false,
            status: "Server Error"
        }));
    }
};

module.exports = {createTournament};