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

/*
Tournament.Tournament({
    name: 'test',
    owner: 'testOwner',
    max_number_participants: 32,
    state: true,
    participants: ['Andrei','Victor']
}).save(function (err) {
    if (err) throw err;
}); */
/*
Game.Game({
    name: 'Uno',
    release_date: '2002-12-09' ,
    company: 'Activisionew',
    popularity: 30,
    genre: ['FPS', 'RTS'], // fps, shooter, rts
    category: 'Boardgame',
    platform: ['PC'],
    age_restriction: 'PG',  // G , PG , PG-13 , R , NC-17
    game_description: 'Interactiv totti'
}).save(function (err) {
    if (err) throw err;
});
*/
console.log("Server is listening on port: " + PORT);
index.listen(PORT);
