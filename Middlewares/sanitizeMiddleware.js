const sanitize = require('mongo-sanitize');

const sanitizeMiddleware = async function(req,res,next){
    if (req.body.usernameRegister !== undefined && req.body.usernameRegister !== null){
        req.body.usernameRegister = sanitize(req.body.usernameRegister);
    }
    if (req.body.passwordRegister !== undefined && req.body.passwordRegister !== null){
        req.body.passwordRegister = sanitize(req.body.passwordRegister);
    }
    if (req.body.passwordConfirmRegister !== undefined && req.body.passwordConfirmRegister !== null){
        req.body.passwordConfirmRegister = sanitize(req.body.passwordConfirmRegister);
    }
    next();
};

module.exports = {sanitizeMiddleware};