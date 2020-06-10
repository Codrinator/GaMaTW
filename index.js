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

Game.clearPlatformForBoard();

console.log("Server is listening on port: " + PORT);
index.listen(PORT);
