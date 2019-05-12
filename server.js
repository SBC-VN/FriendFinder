var express = require('express');

// Init the express app.
var app = express();
var PORT = process.env.PORT || 8080;

// Tell express which middleware to use.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./app/public'));

require('./app/routes/apiRoutes')(app);
require('./app/routes/htmlRoutes')(app);

app.listen(PORT, function() {
  console.log(`Friend Finder App listening on port:${PORT}`);
});
