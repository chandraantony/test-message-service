require('dotenv').config(); 

var CronJob = require('cron').CronJob;
const moment = require('moment')
const messageHelper = require('./src/helpers/message');

const Schedule = require('./src/models/schedule');
const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

function testJOB(){
    try {
        var job = new CronJob(`* * * * *`, async function() {
        var arr = []
        var date = '2012151815'
        const data = await Schedule.find({running_time : date})
        console.log(`Total Message Will Send at ${moment().format('YYYY MM DD HH:mm')} is ${data.length}`)
        await Promise.all(data.map(async (element) => {
            var messageStatus = await messageHelper.sendSMS(element.list_recipient.toString())
            if(Array.isArray(messageStatus)){
                messageStatus.forEach(msgElement => {
                    arr.push({
                        schedule_id : element._id,
                        delivery_time : element.running_time,
                        message_id : msgElement.message_id,
                        status : null
                    })
                });
            }else{
                arr.push({
                    schedule_id : element._id,
                    delivery_time : element.running_time,
                    message_id : messageStatus.message_id,
                    status : null
                })
            } 
        }))
        SmsInfo.insertMany(arr), function (err,doc){
            if(err){
                console.log(err)
            }else{
                console.log(doc)
            }
        }
        console.log(arr)
        });
        job.start(); 
    } catch (error) {
        console.log(error)
    }

}
testJOB()