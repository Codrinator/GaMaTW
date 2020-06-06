const collection = require('../Controllers/index');
const Router = require('router');

const gameCollection = Router();

gameCollection.post('/loadCollection', collection.collection);

module.exports = {gameCollection};