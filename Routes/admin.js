const Router = require('router');
const sanitize = require('../Middlewares/sanitizeMiddleware');
const admin = Router();

const controllers = require('../Controllers/index');

admin.use(sanitize.sanitizeMiddleware);
admin.post('/registerGame',controllers.insertGame);

module.exports={admin};