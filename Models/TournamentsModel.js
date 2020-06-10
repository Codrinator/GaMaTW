const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: String,
    owner: String,
    max_number_participants: Number,
    game: String,
    state: Boolean,
    joinable: Boolean,
    participants: [String],
    match_winner: [String],
    winner: {type: String , default: "TBD"},
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

const verifyTournamentName= async function(name){
  const query=Tournament.find();
  query.where({name:name});
  return query.exec();
};

const getTournamentCount = async function(){
    const query = Tournament.find();
    query.count({joinable: true});
    return query.exec();
};

const makeNotJoinable = async function(title){
    const query = Tournament.findOne({name: title});
    const doc = await query.exec();
    doc.joinable = false;
    doc.save();
};

const updateMatches = async function(title,match,participant,username,nextMatch){
    const query = Tournament.findOne({name: title});
    const doc = await query.exec();
    doc.match_winner.set(match,username);
    if (nextMatch === -1 || match === doc.max_number_participants-2){
        if (doc.winner !== "TBD"){
            const removePoints = require("./UserModel").addPoints;
            await removePoints(-500,doc.winner);
        }
        doc.winner = username;
    } else {
      if (participant === "one"){
          doc.matches[nextMatch].participantOne = username;
      } else {
          doc.matches[nextMatch].participantTwo = username;
      }
    }
    doc.save();
}

const addParticipant = async function(title,username){
    const query = Tournament.findOne({name: title});
    const doc = await query.exec();
    if (doc.joinable === true) {
        doc.participants.push(username);
        let i = 0;
        let foundSpot = false;
        while (!foundSpot && i < doc.max_number_participants/2){
            if (doc.matches[i].participantOne === "TBD"){
                doc.matches[i].participantOne = username;
                foundSpot = true;
            } else if (doc.matches[i].participantTwo === "TBD") {
                doc.matches[i].participantTwo = username;
                foundSpot = true;
            } else i++;
        }
        if (doc.participants.length === doc.max_number_participants) {
            doc.state = true;
            doc.joinable = false;
            const participants = doc.participants;
            doc.matches=[];
            for (let i = 0; i < participants.length ; i++){
                doc.matches.push({participantOne: participants[i],participantTwo: participants[++i]});
            }
            for (let i = participants.length/2 ; i<participants.length-1 ; i++){
                doc.matches.push({participantOne: "TBD", participantTwo: "TBD"});
            }
        }
        doc.save();
        return "joined";
    } else return "full";
};

const removeParticipant = async function(title,username){
    const query = Tournament.findOne({name: title});
    const doc = await query.exec();
    if (doc.participants.length < doc.max_number_participants){
        doc.participants = doc.participants.filter(s => s !== username);
        for (let i=0; i < doc.max_number_participants/2; i++){
            if (doc.matches[i].participantOne === username){
                doc.matches[i].participantOne = "TBD";
            }
            if (doc.matches[i].participantTwo === username) {
                doc.matches[i].participantTwo = "TBD";
            }
        }
    }
    doc.save();
};

const Tournament = mongoose.model('Tournaments', TournamentSchema);

module.exports = {Tournament,getAll,getTournamentPage,getTournamentCount,addParticipant,getTournamentByName,removeParticipant,
    makeNotJoinable,verifyTournamentName,updateMatches};

