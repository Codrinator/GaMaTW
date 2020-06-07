const login = require('./loginController').login;
const register = require('./registerController').register;
const rssFeed = require('./rssFeedController').generateFeed;
const collection = require('./collectionController').loadCollection;
const getStatistic = require('./collectionController').getStatistic;
const getCSV = require('./collectionController').getCSV;
const insertGame = require('./adminController').insertGame;
const deleteGame = require('./adminController').deleteGame;

module.exports = {login,register,insertGame,rssFeed,collection,getStatistic,getCSV,deleteGame};

