const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const handlers = require('./handlers');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'WELLCOM'
  });
});

app.use('/api/v1', api);

app.use(handlers.notFound);
app.use(handlers.errorHandler);

module.exports = app;
