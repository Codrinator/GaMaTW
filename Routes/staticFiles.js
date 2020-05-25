const fs = require('fs');
const ejs = require('ejs');



const homePage = async function (req,res) {
    ejs.renderFile('./Views/homePage.ejs', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(str);
            res.end();
        }
    });
};

const homePageStyle = async function (req,res) {
    ejs.renderFile('./Assets/Styles/home.css', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/css"});
            res.write(str);
            res.end();
        }
    });
};


const gameCollection = async function (req,res) {
    ejs.renderFile('./Views/gameCollection.ejs', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(str);
            res.end();
        }
    });
};

const gameCollectionStyle = async function (req,res) {
    ejs.renderFile('./Assets/Styles/gameCollection.css', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/css"});
            res.write(str);
            res.end();
        }
    });
};

const tournaments = async function (req,res) {
    ejs.renderFile('./Views/tournaments.ejs', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(str);
            res.end();
        }
    });
};

const tournamentsStyle = async function (req,res) {
    ejs.renderFile('./Assets/Styles/tournaments.css', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/css"});
            res.write(str);
            res.end();
        }
    });
};

const login = async function (req,res) {
    ejs.renderFile('./Views/login.ejs', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(str);
            res.end();
        }
    });
};

const loginStyle = async function (req,res) {
    ejs.renderFile('./Assets/Styles/login.css', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/css"});
            res.write(str);
            res.end();
        }
    });
};

const register = async function (req,res) {
    ejs.renderFile('./Views/register.ejs', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(str);
            res.end();
        }
    });
};

const registerStyle = async function (req,res) {
    ejs.renderFile('./Assets/Styles/register.css', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/css"});
            res.write(str);
            res.end();
        }
    });
};

module.exports = {homePage, homePageStyle, gameCollection, gameCollectionStyle, tournaments,
                  tournamentsStyle, login, loginStyle, register, registerStyle};