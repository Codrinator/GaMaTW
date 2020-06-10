const Tournament = require('../../Models').Tournament;
const Game = require('../../Models').Game;
const setUserState = require('../../Models/UserModel').modifyInTournamentValue;
const createTournament = async function (req, res) {
    try {
        const username = req.user.payload;
        const name = req.body.name;
        const max_number_participants = req.body.max_number_participants;
        const game = req.body.game;
        const matches = [];
        const match_winners = [];

        const arrayRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
        if ((await Tournament.verifyTournamentName(name)).length !==0) {
            res.end(JSON.stringify({
                success: false,
                status: 'Tournament name already taken'
            }));
        } else if (arrayRegex.test(name) === false) {
            res.end(JSON.stringify({
                success: false,
                status: 'Name cannot contain special characters'
            }));
        } else if ((await Game.getByName(game)).length === 0) {
            res.end(JSON.stringify({
                success: false,
                status: 'Game not existent in our database'
            }));
        } else {
            for (let i = 0; i < max_number_participants - 1; i++) {
                matches.push({participantOne: "TBD", participantTwo: "TBD"});
                match_winners.push("ND");
            }
            await setUserState(true, username, name);
            Tournament.Tournament({
                name: name,
                owner: username,
                max_number_participants: max_number_participants,
                game: game,
                state: false,
                joinable: true,
                participants: [],
                match_winner: match_winners,
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