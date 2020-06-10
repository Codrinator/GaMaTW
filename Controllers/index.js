const login = require('./loginController').login;
const register = require('./registerController').register;
const rssFeed = require('./rssFeedController').generateFeed;
const collection = require('./collectionController').loadingCollection;
const getStatistic = require('./collectionController').getStatistic;
const getCSV = require('./collectionController').getCSV;
const insertGame = require('./adminController').insertGame;
const getTournamentPage = require('./Tournaments/tournamentPageController').getPage;
const joinTournament = require('./Tournaments/tournamentJoinController').joinTournament;
const isInTournament = require('./Tournaments/isInTournamentController').isInTournament;
const deleteGame = require('./adminController').deleteGame;
const createTournament = require('./Tournaments/tournamentCreateController').createTournament;
const leaveTournament = require('./Tournaments/tournamentLeaveController').leaveTournament;
const declareWinner = require('./Tournaments/tournamentDeclareMatchWinnerController').declareMatchWinner;

module.exports = {
    login,
    register,
    insertGame,
    rssFeed,
    collection,
    getStatistic,
    getCSV,
    getTournamentPage,
    joinTournament,
    isInTournament,
    deleteGame,
    createTournament,
    leaveTournament,
    declareWinner
};

