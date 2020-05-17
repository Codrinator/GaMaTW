const mongoose = require('mongoose');
const http = require('http');
const Router = require('router');
const finalhandler = require('finalhandler');


mongoose.connect('mongodb+srv://myUser:myUser@gamatw-dmppl.mongodb.net/test?retryWrites=true&w=majority');
const PORT = 11101;
const router =Router();

//test code--
const User = require('./Models/index');
const user = User.User({username: 'Dragos',password: 'parola'}).save(function (err) {
    if (err) throw err;
    console.log('user saved');
});
//

const server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res));
});


console.log("Server is listening on port: "+PORT)
server.listen(PORT);
