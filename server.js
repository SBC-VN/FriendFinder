var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

require('.app/routing/apiRoutes')(app);
require('.app/routing/htmlRoutes')(app);

app.listen(PORT, function() {
  console.log(`Now listening on port:${PORT}`);
});