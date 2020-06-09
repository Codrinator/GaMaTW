const tournament = require('../../Models/TournamentsModel').addParticipant;
const setUserState = require('../../Models/UserModel').modifyInTournamentValue;
const joinTournament = async function(req,res){
    try{
        const username = req.user.payload;
        const tournamentName = req.body.tournament;
        const status = await tournament(tournamentName,username);
        if (status === "joined"){
            await setUserState(true,username,tournamentName);
            res.statusCode = 200;
            res.end(JSON.stringify({
                success : true,
            }));
        } else {
            res.statusCode = 408;
            res.end(JSON.stringify({
                success : false,
                status : status
            }));
        }
    } catch(error){
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify({
            success : false,
            status : "Server Error"
        }));
    }
};

module.exports = {joinTournament};