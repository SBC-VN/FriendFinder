var friends = require('../data/friends');

module.exports = function(app) {
    
    app.get('/api/friends',function(req,res) {
        res.json(friends);
    });

    app.post('/api/friends',function(req,res) {
        friends.push(req.body);
        res.json(req.body);
    });

    app.post('/api/fileupload',function(req,res) {
        console.log(req);
        res.send("confirmed");
    });
};