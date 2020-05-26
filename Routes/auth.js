const Router = require('router');
const sanitize = require('../Middlewares/authMiddleware');
const auth = Router();

auth.use(sanitize.sanitizeMiddleware);
auth.post('/register' , function () {
    console.log("da");
})

module.exports = {auth};