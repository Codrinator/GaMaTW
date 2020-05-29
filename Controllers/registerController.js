const User = require('../Models/index').User;
const crypto = require('crypto');


const register = async function register(req, res) {

    const username = req.body.usernameRegister;
    const password = req.body.passwordRegister;
    const passwordConfirm = req.body.passwordConfirmRegister;

    let letterNumberRegex = /^[0-9a-zA-Z]+$/;

    if (username.length < 4) {
        res.end(JSON.stringify({
            success: 'false',
            status: 'Username too short'
        }));
    } else if (username.length > 50) {
        res.end(JSON.stringify({
            success: 'false',
            status: 'Username too long'
        }));
    } else if (letterNumberRegex.test(username) === false) {
        res.end(JSON.stringify({
            success: 'false',
            status: 'Username contains special characters. Only numbers and letters are allowed'
        }));
    } else if ((await User.findUserByUsername(username)).length !== 0) {
        res.end(JSON.stringify({
            success: 'false',
            status: 'Username already taken'
        }));
    } else if (password.length < 4) {
        res.end(JSON.stringify({
            success: 'false',
            status: 'Password too short'
        }));
    } else if (password.length > 50) {
        res.end(JSON.stringify({
            success: 'false',
            status: 'Password too long'
        }));
    } else if (letterNumberRegex.test(password) === false) {
        res.end(JSON.stringify({
            success: 'false',
            status: 'Password has special characters. Only numbers and letters are allowed'
        }));
    } else if (passwordConfirm !== password)
        res.end(JSON.stringify({
            success: 'false',
            status: 'Passwords do not match'
        }));
    else {

        const hash = crypto.createHash('sha256');
        const hashedPassword = hash.update(password).digest('hex');
        User.User({username: username, password: hashedPassword}).save(function (err) {
            if (err) throw err;
            res.end(JSON.stringify({
                success: true,
                status: 'Registration complete'
            }))
        });
    }
};

module.exports = {register};