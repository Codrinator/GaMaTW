const jwt = require('jsonwebtoken');
const crs = require('crypto-random-string');
const secret = crs({length: 25});


const createToken = async function(payload){
    try {
        return jwt.sign({payload}, secret);
    } catch (err) {
        throw err;
    };
}

const getTokenFromHeader = async function(req){
    if (req.headers.authorization !== null && req.headers.authorization !== undefined
     && req.headers.authorization.split(" ")[0] === "Bearer"){
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

const verifyToken = async function(token){
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        throw err;
    }
}

module.exports = {createToken, getTokenFromHeader, verifyToken};