const Router = require('router');
const statics = require('./staticFiles');
const bodyParser = require('body-parser');
const auth = require('./auth').auth;
const collection = require('./collection').gameCollection;
const rss = require('./rssFeed').rssFeed;
const scripts = require('./scripts');
const authorize = require('../Middlewares/authorizationMiddleware').checkAuthorization;
const router = Router();
const api = Router();


router.use('/api/',api);
router.use(bodyParser.json());
api.use(authorize);
api.use('/auth',auth);
api.use('/gameCollection', collection); //din collection.js la export
router.get('/rssFeed', rss);

router.get('/', statics.homePage);
router.get('/Assets/Styles/home.css', statics.homePageStyle);

router.get('/gameCollection', statics.gameCollection);
router.get('/Assets/Styles/gameCollection.css', statics.gameCollectionStyle);

router.get('/tournaments', statics.tournaments);
router.get('/Assets/Styles/tournaments.css', statics.tournamentsStyle);

router.get('/login', statics.login);
router.get('/Assets/Styles/login.css', statics.loginStyle);


router.get('/register', statics.register);
router.get('/Assets/Styles/register.css', statics.registerStyle);


router.get('/Assets/Scripts/register.js', scripts.registerScript);
router.get('/Assets/Scripts/login.js', scripts.loginScript);
router.get('/Assets/Scripts/loadPageOptions.js', scripts.loadPageScript);
router.get('/Assets/Scripts/loadGameCollection.js', scripts.loadGameCollection);
module.exports = {router};