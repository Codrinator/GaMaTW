const login = require('./loginController').login;
const register = require('./registerController').register;
const rssFeed = require('./rssFeedController').generateFeed;
const collection = require('./collectionController').loadCollection;
const getStatistic = require('./collectionController').getStatistic;
const getCSV = require('./collectionController').getCSV;
const insertGame = require('./adminController').insertGame;
const getTournamentPage = require('./tournamentPageController').getPage;
const joinTournament = require('./tournamentJoinController').joinTournament;
const isInTournament = require('./isInTournamentController').isInTournament;
const deleteGame = require('./adminController').deleteGame;
const createTournament = require('./tournamentCreateController').createTournament;
const leaveTournament = require('./tournamentLeaveController').leaveTournament;

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
    leaveTournament
};

