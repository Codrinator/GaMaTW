const tournament = require('../../Models/TournamentsModel').getTournamentPage;
const tournamentCount = require('../../Models/TournamentsModel').getTournamentCount;
const getPage = async function(req, res){
    try{
        const take = req.body.pageSize;
        const skip = take*(req.body.page - 1);
        const tournaments = await tournament(skip,take);
        const numberOfTournaments = await tournamentCount();
        let formattedData = [];
        for (let i = 0; i < tournaments.length; i++) {
            formattedData.push({
                tournamentName: tournaments[i].name,
                game: tournaments[i].game,
                participants: tournaments[i].participants.length + '/' + tournaments[i].max_number_participants
            });
        };
        res.statusCode = 200;
        res.end(JSON.stringify({
            success : true,
            tournaments : formattedData,
            activeTournaments : numberOfTournaments
        }));
    } catch(error){
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify({
            success : false
        }));
    }
}

module.exports = {getPage};