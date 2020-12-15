var CronJob = require('cron').CronJob;
const moment = require('moment')
const date = moment().format('YYMMDDhhmm')
console.log(date)

var job = new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
job.start();