const crypto = require('crypto');
const User = require('../Models/index').User;

const login = async function (req,res){
    try {
        const username = req.body.username;
        const password = req.body.password;
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
                res.statusCode = 200;
                res.end(JSON.stringify({
                    success : true,
                    status : "Logged In!",
                    username : username,
                    token : 'Not Available Yet'
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
}

module.exports = {login};