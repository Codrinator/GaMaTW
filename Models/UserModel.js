const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    user_score: {type: Number, default: 0}
});

const User = mongoose.model('User', userSchema);


const findUserByUsername = async function (username) {
    const query = User.find();
    query.where({username: username});
    return query.exec();
};

const getTopUsers = async function () {
    const query = User.find();
    query.sort({user_score: -1}).limit(3);
    return query.exec();
};

const countUsers = async function () {
    const query = User.count();
    return query.exec();
};

module.exports = {User, findUserByUsername, countUsers,getTopUsers};

