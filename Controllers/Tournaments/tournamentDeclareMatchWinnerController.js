const updateTournament = require("../../Models/TournamentsModel").updateMatches;
const addPoints = require('../../Models/UserModel').addPoints;
const declareMatchWinner = async function(req,res){
    try{
        const title = req.body.tournament;
        const match = req.body.currentMatch;
        const participant = req.body.participant;
        const username = req.body.username;
        const nextMatch = req.body.nextMatch;
        await updateTournament(title,match,participant,username,nextMatch);
        if (nextMatch === -1){
            await addPoints(500,username);
        }
        res.statusCode = 200;
        res.end(JSON.stringify({
            success : true,
        }));
    } catch(error){
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify({
            success : false,
            status : "Server Error"
        }));
    }
}

module.exports = {declareMatchWinner};