const express = require('express');
const timeout = require('connect-timeout');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression')
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

require('dotenv').config(); 

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

let db = mongoose.connection;

db.once('open', function(){
  console.log('connected')
})

db.on('error', function(err){
  return err
})



const handlers = require('./handlers');
const api = require('./api');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }))

app.use(helmet());
app.use(cors());
app.use(compression())
app.use(timeout('5s'))
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'HAI',
  });
});


app.use('/api/v1', api);

app.use(handlers.haltOnTimedout)
app.use(handlers.notFound);
app.use(handlers.errorHandler);

module.exports = app;
