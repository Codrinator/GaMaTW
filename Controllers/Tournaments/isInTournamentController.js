const getUser = require('../../Models/UserModel').findUserByUsername;
const getTournament = require('../../Models/TournamentsModel').getTournamentByName;
const isInTournament = async function(req,res){
    try{
        const user = (await getUser(req.user.payload))[0];
        if (user.inTournament){
            const tournament = await getTournament(user.tournament);
            res.statusCode = 200;
            res.end(JSON.stringify({
                success : true,
                isInTour : true,
                tournament : tournament,
                numberOfPlayers : tournament.max_number_participants
            }));
        }else{
            res.statusCode = 200;
            res.end(JSON.stringify({
                success : true,
                isInTour : false
            }));
        }
    } catch(error){
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify({
            success : false
        }));
    }
}

module.exports = {isInTournament};