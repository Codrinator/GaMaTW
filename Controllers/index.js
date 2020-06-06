const login = require('./loginController').login;
const register = require('./registerController').register;
const rssFeed = require('./rssFeedController').generateFeed;
const collection = require('./collectionController').loadCollection;
const getStatistic = require('./collectionController').getStatistic;

module.exports = {login,register,rssFeed,collection,getStatistic};

