const Router = require('router');
const router = Router();
const fs = require('fs');

fs.readFile('./Views/homePage.html', function (err, html) {
    if (err) {
        throw err;
    }
    router.get('/', function (req, res) {
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
});

module.exports = {router};