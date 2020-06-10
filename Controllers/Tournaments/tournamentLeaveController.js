const setUserState = require('../../Models/UserModel').modifyInTournamentValue;
const getUser = require('../../Models/UserModel').findUserByUsername;
const removeParticipant = require('../../Models/TournamentsModel').removeParticipant;
const changeTournamentState = require('../../Models/TournamentsModel').makeNotJoinable;

const leaveTournament = async function(req,res){
    try{
        const username = req.user.payload;
        const tour = req.body.tournamentName;
        if (req.body.isOwner){
            await changeTournamentState(tour);
            await setUserState(false,username,"");
            res.statusCode = 200;
            res.end(JSON.stringify({
                success : true,
            }));
        } else {
            await removeParticipant(tour,username);
            await setUserState(false,username,"");
            res.statusCode = 200;
            res.end(JSON.stringify({
                success : true,
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

module.exports = {leaveTournament};