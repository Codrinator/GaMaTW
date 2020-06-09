const setUserState = require('../../Models/UserModel').modifyInTournamentValue;
const getUser = require('../../Models/UserModel').findUserByUsername;
const removeParticipant = require('../../Models/TournamentsModel').removeParticipant;
const changeTournamentState = require('../../Models/TournamentsModel').makeNotJoinable;

const leaveTournament = async function(req,res){
    try{
        const username = req.user.payload;
        if (req.body.isOwner){
            await setUserState(false,username,"");
            const user = (await getUser(username))[0];
            await changeTournamentState(user.tournament);
            res.statusCode = 200;
            res.end(JSON.stringify({
                success : true,
            }));
        } else {
            await setUserState(false,username,"");
            const user = (await getUser(username))[0];
            await removeParticipant(user.tournament,username);
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
}

module.exports = {leaveTournament};