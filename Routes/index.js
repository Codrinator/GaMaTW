const Router = require('router');
const statics = require('./staticFiles');
const bodyParser = require('body-parser');
const auth = require('./auth').auth;
const scripts = require('./scripts');
const router = Router();
const api = Router();


router.use('/api/',api);
api.use(bodyParser.json());
api.use('/auth',auth);


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

router.get('/Assets/Scripts/register.js',statics.registerScript);
router.get('/Assets/Scripts/login.js', scripts.loginScript);


module.exports = {router};