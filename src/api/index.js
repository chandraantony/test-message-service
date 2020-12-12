const express = require('express');

const message = require('./message')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'HELLO'
  });
});

router.use('/message', message);

module.exports = router;
