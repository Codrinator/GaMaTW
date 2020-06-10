const Router = require('router');
const statics = require('./staticFiles');
const bodyParser = require('body-parser');
const auth = require('./auth').auth;
const admin= require('./admin').admin;
const collection = require('./collection').gameCollection;
const tournaments = require('./tournament').tournament;
const rss = require('./rssFeed').rssFeed;
const scripts = require('./scripts');
const authorize = require('../Middlewares/authorizationMiddleware').checkAuthorization;
const router = Router();
const api = Router();


router.use('/api/',api);
api.use(bodyParser.json());
api.use(authorize);
api.use('/auth',auth);

api.use('/gameCollection', collection);
api.use('/admin',admin);
api.use('/tournaments', tournaments);

router.get('/rssFeed', rss);

router.get('/', statics.homePage);
router.get('/Assets/Styles/home.css', statics.homePageStyle);

router.get('/deleteGame',statics.deleteGame);
router.get('/Assets/Styles/deleteGame.css', statics.deleteGameStyle);

router.get('/admin',statics.admin);
router.get('/Assets/Styles/admin.css', statics.adminStyle);

router.get('/gameCollection', statics.gameCollection);
router.get('/Assets/Styles/gameCollection.css', statics.gameCollectionStyle);

router.get('/tournaments', statics.tournaments);
router.get('/Assets/Styles/tournaments.css', statics.tournamentsStyle);

router.get('/login', statics.login);
router.get('/Assets/Styles/login.css', statics.loginStyle);


router.get('/register', statics.register);
router.get('/Assets/Styles/register.css', statics.registerStyle);

router.get('/scholarly', statics.scholarlyHTML);
router.get('/Assets/Styles/scholarly.css', statics.scholarlyCSS);

router.get('/Assets/Scripts/register.js', scripts.registerScript);
router.get('/Assets/Scripts/login.js', scripts.loginScript);
router.get('/Assets/Scripts/loadPageOptions.js', scripts.loadPageScript);
router.get('/Assets/Scripts/loadTournaments.js', scripts.loadTournamentsScript);
router.get('/Assets/Scripts/loadGameCollection.js', scripts.loadGameCollection);
router.get('/Assets/Scripts/admin.js',scripts.adminScript);
router.get('/Assets/Scripts/deleteGame.js',scripts.deleteGameScript);
module.exports = {router};