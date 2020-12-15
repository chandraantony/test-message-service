const express = require('express');

const schedule = require('./schedule')
const sms = require('./sms')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'HELLO'
  });
});
router.use('/schedule', schedule);
router.use('/sms', sms);

module.exports = router;
