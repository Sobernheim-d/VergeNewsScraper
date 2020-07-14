//dependencies
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var Handlebars = require('handlebars');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//initialize Express app
var express = require('express');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

//app.use(express.static(process.cwd() + '/public'));
app.use(express.static("public"))

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout:"main",
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

//connecting to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_jxkjhg1v:6s68tem51mlionrj2sneb7b53c@ds127988.mlab.com:27988/heroku_jxkjhg1v";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });

// mongoose.connect('mongodb://heroku_jxkjhg1v:6s68tem51mlionrj2sneb7b53c@ds127988.mlab.com:27988/heroku_jxkjhg1v');

//mongoose.connect('mongodb://localhost/scraped_news');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongoose!')
});

var routes = require('./controller/controller.js');
app.use(routes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});
