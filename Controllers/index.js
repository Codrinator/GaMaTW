const login = require('./loginController').login;
const register = require('./registerController').register;
const rssFeed = require('./rssFeedController').generateFeed;
const collection = require('./collectionController').loadCollection;
const getStatistic = require('./collectionController').getStatistic;
const getCSV = require('./collectionController').getCSV;

module.exports = {login,register,rssFeed,collection,getStatistic,getCSV};

