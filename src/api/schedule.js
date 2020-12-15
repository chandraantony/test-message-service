const express = require('express');
const schedule = require('../controllers/schedule');

const router = express.Router();

router.get('/', schedule.getScehdule );
router.get('/:id', schedule.getByiD );

module.exports = router;
