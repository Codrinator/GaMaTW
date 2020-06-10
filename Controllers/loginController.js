const crypto = require('crypto');
const User = require('../Models/index').User;
const createToken = require('../Utils/authorizationTokenUtils').createToken;

const login = async function (req,res){
    try {
        const username = req.body.usernameRegister;
        const password = req.body.passwordRegister;
        const userByUsername = await User.findUserByUsername(username);
        if (!userByUsername.length){
            res.statusCode = 401;
            res.end(JSON.stringify({
                success : false,
                status : 'Invalid username'
            }));
        } else {
            const user = userByUsername[0];
            const hash = crypto.createHash('sha256');
            const hashedPWD = hash.update(password).digest('hex');
            if (hashedPWD.localeCompare(user.password) !== 0){
                res.statusCode = 401;
                res.end(JSON.stringify({
                    success : false,
                    status : 'Invalid password'
                }));
            } else {
                const token = await createToken(username);
                res.statusCode = 200;
                res.end(JSON.stringify({
                    success : true,
                    status : "Logged In!",
                    username : username,
                    token : token
                }));
            }
        }
    }catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end(JSON.stringify({
            success : false
        }));
    }
};

module.exports = {login};