const mongoose = require('mongoose');
const http = require('http');
const router = require('./Routes/index').router;
const finalhandler = require('finalhandler');
const Tournament = require('./Models/index').Tournament;
const Game = require('./Models/index').Game;

mongoose.connect('mongodb+srv://myUser:myUser@gamatw-dmppl.mongodb.net/test?retryWrites=true&w=majority');
const PORT = 11100;


const index = http.createServer(function (req, res) {
    router(req, res, finalhandler(req, res));
});

Tournament.Tournament({
    name: 'TestHAIDA',
    owner: 'testOwner',
    max_number_participants: 4,
    game: 'Worms',
    state: true,
    joinable: true,
    participants: [],
    matches: [{participantOne: "TBD" , participantTwo: "TBD"},{participantOne: "TBD" , participantTwo: "TBD"},{participantOne: "TBD" , participantTwo: "TBD"}]
}).save(function (err) {
    if (err) throw err;
});

console.log("Server is listening on port: " + PORT);
index.listen(PORT);
