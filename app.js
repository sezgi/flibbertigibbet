var express = require('express'),
    hbs = require('hbs'),
    logfmt = require('logfmt'),
    app = express();

app.use(express.static('public'));
app.use(logfmt.requestLogger());

app.set('view engine', 'html');
app.engine('html', hbs.__express);
 
app.use(function(req, res, next){
  req.config = {
    foursquareClientId: process.env.FOURSQUARE_CLIENT_ID,
    foursquareClientSecret: process.env.FOURSQUARE_CLIENT_SECRET,
    foursquareVersion: process.env.FOURSQUARE_VERSION
  }
  next();
});

app.get('/', function(req, res) {
  res.render('index', { config: req.config });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
