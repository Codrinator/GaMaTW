const collection = require('../Controllers/index');
const Router = require('router');

const gameCollection = Router();

gameCollection.get('/loadCollection', collection.loadCollection);

module.exports = {collection}