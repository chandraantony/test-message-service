const express = require('express');
const sms = require('../controllers/sms');

const router = express.Router();

router.get('/', sms.getSms );
router.get('/:id', sms.getByiD );

module.exports = router;
