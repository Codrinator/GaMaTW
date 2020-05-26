const Router = require('router');
const sanitize = require('../Middlewares/authMiddleware');
const auth = Router();
const controllers = require('../Controllers/index');

auth.use(sanitize.sanitizeMiddleware);
auth.post('/login' , controllers.login);

module.exports = {auth};