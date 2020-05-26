const Router = require('router');
const sanitize = require('../Middlewares/authMiddleware');
const auth = Router();
const controller = require('../Controllers/index');

auth.use(sanitize.sanitizeMiddleware);
auth.post('/register' ,controller.register);



module.exports = {auth};