const fs = require('fs');

const loginScript = async function (req,res) {
    fs.readFile('./Assets/Scripts/login.js',function (err,str) {
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "application/javascript"});
            res.write(str);
            res.end();
        }
    });
};

const registerScript = async function (req,res) {
    fs.readFile('./Assets/Scripts/register.js', function(err, str){
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "application/javascript"});
            res.write(str);
            res.end();
        }
    });
};

const loadPageScript = async function (req, res) {
    fs.readFile('./Assets/Scripts/loadPageOptions.js',function (err,str) {
        if (err) {
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "application/javascript"});
            res.write(str);
            res.end();
        }
    });
};

const loadGameCollection = async function(req, res){ //codrin
    fs.readFile('./Assets/Scripts/loadGameCollection.js', function(err,str){
        if(err){
            throw err;
        } else {
            res.writeHeader(200, {"Content-Type": "application/javascript"});
            res.write(str);
            res.end();
        }
    });
}

module.exports = {loginScript,registerScript,loadPageScript, loadGameCollection};