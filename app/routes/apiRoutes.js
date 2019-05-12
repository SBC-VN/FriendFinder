var friends = require('../data/friends');

var multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'app/data/profilepics')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
   
var upload = multer({ storage: storage })

module.exports = function(app) {
    
    app.get('/api/friends',function(req,res) {
        res.json(friends);
    });

    app.post('/api/friends',function(req,res) {
        console.log("posted friend!");
        friends.push(req.body);
        res.json(req.body);
    });

    app.post('/api/uploadfile', upload.single('myFile'), (req, res, next) => {
        const file = req.file;
        if (!file) {
          const error = new Error('Please upload a file');
          error.httpStatusCode = 400;
          return next(error);
        }
        res.end();    
    });
};
