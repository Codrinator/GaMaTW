const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: String,
    owner: String,
    max_number_participants: Number,
    game: String,
    state: Boolean,
    participants: [String],
    active_participants: [String],
    matches:  [{participantOne: String, participantOne: String}],
    created_at: {type: Date, default: Date.now}
});

const getAll=async function(){
    const query=Tournament.find();
    return query.exec();
};

const Tournament = mongoose.model('Tournaments', TournamentSchema);

module.exports = {Tournament,getAll};

