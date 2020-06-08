const Router = require('router');
const tournament = Router();

const controllers = require('../Controllers/index');

tournament.post('/getPage',controllers.getTournamentPage);
tournament.post('/join',controllers.joinTournament);
tournament.get('/isInTournament',controllers.isInTournament);

module.exports = {tournament};