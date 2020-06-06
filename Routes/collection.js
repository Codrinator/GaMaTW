const collection = require('../Controllers/index');
const Router = require('router');

const gameCollection = Router();

gameCollection.post('/loadCollection', collection.collection);
gameCollection.get('/downloadStatistic', collection.getStatistic);

module.exports = {gameCollection};