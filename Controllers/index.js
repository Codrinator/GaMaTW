const login = require('./loginController').login;
const register = require('./registerController').register;
const rssFeed = require('./rssFeedController').generateFeed;
module.exports = {login,register,rssFeed};

