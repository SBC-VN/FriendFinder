var friends = require('../data/friends');
var fs = require("fs");

var formidable = require('formidable');

function findBestMatch(myinfo) {
    var curMatch = null;
    var curMatchValue = 1000;
    var matchValue;

    for (var i=0; i < friends.length; i++) {
        // Your best match will always be yourself, so skip yourself.
        if (myinfo.name != friends[i].name) {
            matchValue = 0;
            for (j=0; j<myinfo.answers.length; j++) {
                matchValue += Math.abs(myinfo.answers[j] - friends[i].answers[j]);
            }
            if (matchValue < curMatchValue) {
                curMatch = friends[i];
            }
        }
    }
    return curMatch;
}

module.exports = function(app) {
    
    app.get('/api/friends',function(req,res) {
        res.json(friends);
    });

    app.post('/api/friends',function(req,res) {
        friends.push(req.body);
        var outstr = "module.exports = " + JSON.stringify(friends, undefined, 2) + ";";

        fs.writeFile("app/data/friends.js", outstr, function(err) {
            if (err) {
              console.log(err);
              error.httpStatusCode = 400;
              res.send("Error saving friends file " + err);
            } 
        });
        res.json(findBestMatch(req.body));
    });

    app.post('/api/uploadfile', function(req,res) {
        var form = new formidable.IncomingForm();
        form.parse(req);

        form.on('fileBegin', function (name, file){
            file.path = __dirname + '/../public/assets/profilepics/' + file.name;
        });

        form.on('file', function (name, file){
            console.log('Uploaded ' + file.name);
        });

        res.status(200);
    });
};
