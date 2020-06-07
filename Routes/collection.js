const collection = require('../Controllers/index').collection;
const Router = require('router');

const gameCollection = Router();

gameCollection.post('/loadCollection', collection);
gameCollection.get('/downloadStatistic', collection.getStatistic);
gameCollection.get('/downloadCSV', collection.getCSV);

module.exports = {gameCollection};