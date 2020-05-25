async function InsertUserInDB(req){
    const User = require('./Models/index');
    User.User({username: req.username,password: req.password}).save(function (err) {
        if (err) throw err;
        console.log('user saved');
    });
}

module.exports = {InsertUserInDB};