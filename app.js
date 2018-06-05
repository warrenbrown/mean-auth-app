const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const api = require('./routes/api')

process.env.NODE_ENV = 'development';
const app = express();

app.use(cors({ origin: 'http://localhost:4200'}) );

//connect to database
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to ' + config.db + ' at: ' + config.uri);
  }
});


app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api', api)

port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Invalid endpoint');
});



app.listen(port, function() {
  console.log('Applicaion in running on http://localhost:' + port);
});

module.exports = app;
