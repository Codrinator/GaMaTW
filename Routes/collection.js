const collection = require('../Controllers/index').collection;
const Router = require('router');

const gameCollection = Router();

gameCollection.post('/loadCollection', collection);

module.exports = {gameCollection};