const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: String,
    owner: String,
    max_number_participants: Number,
    game: String,
    state: Boolean,
    joinable: Boolean,
    participants: [String],
    active_participants: [String],
    matches:  [{participantOne: String, participantTwo: String}],
    created_at: {type: Date, default: Date.now}
});

const getAll = async function(){
    const query=Tournament.find();
    return query.exec();
};

const getTournamentPage = async function(skip,take){
    const query = Tournament.find();
    query.sort({created_at: -1}).where({joinable: true}).skip(skip).limit(take);
    return query.exec();
};

const getTournamentByName = async function(tournamentName){
    const query = Tournament.findOne({name: tournamentName});
    return query.exec();
};

const getTournamentCount = async function(){
    const query = Tournament.find();
    query.count({joinable: true});
    return query.exec();
};

const addParticipant = async function(title,username){
    const query = Tournament.findOne({name: title});
    const doc = await query.exec();
    if (doc.joinable === true) {
        doc.participants.push(username);
        doc.active_participants.push(username);
        if (doc.participants.length === doc.max_number_participants) {
            doc.joinable = false;
            const participants = doc.participants;
            for (let i = 0; i < participants.length ; i++){
                doc.matches.push({participantOne: participants[i],participantTwo: participants[++i]});
            }
        }
        doc.save();
        return "joined";
    } else return "full";
}

const Tournament = mongoose.model('Tournaments', TournamentSchema);

module.exports = {Tournament,getAll,getTournamentPage,getTournamentCount,addParticipant,getTournamentByName};

