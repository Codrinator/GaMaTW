const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    inTournament: {type: Boolean, default: false},
    tournament: {type: String, default:""},
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

const modifyInTournamentValue = async function (newState,username,tournament){
    const query = User.find();
    query.where({username: username});
    const doc = (await query.exec())[0];
    if (newState) doc.user_score = doc.user_score + 50;
    doc.inTournament = newState;
    doc.tournament = tournament;
    doc.save();
}

const addPoints = async function (score,username) {
    const query = User.find();
    query.where({username: username});
    const doc = (await query.exec())[0];
    doc.user_score = doc.user_score + score;
    doc.save();
}

module.exports = {User, findUserByUsername, countUsers, getTopUsers, modifyInTournamentValue,addPoints};

