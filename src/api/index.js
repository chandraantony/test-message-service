const express = require('express');

const schedule = require('./schedule')
const sms = require('./sms')

const Schedule = require('../models/schedule')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'HELLO'
  });
});


router.post('/testPost' , async (req,res,next) =>{
  const data = req.body
  try {
    const schedule = new Schedule;
    schedule.running_time = data.running_time;
    schedule.message = data.message;
    schedule.list_recipient = data.list_recipient;
    schedule.status = data.status;

    const save = await schedule.save()
    res.json(
      save
    )


  } catch (error) {
    next(error)
  }
})

router.use('/schedule', schedule);
router.use('/sms', sms);

module.exports = router;
