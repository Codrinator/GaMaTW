const fs = require('fs');

const loginScript = async function (req,res) {
    fs.readFile('./Assets/Scripts/login.js',function (err,str) {
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "text/js"});
            res.write(str);
            res.end();
        }
    });
};

module.exports = {loginScript};