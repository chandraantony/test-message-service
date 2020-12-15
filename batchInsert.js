require('dotenv').config(); 
const mongoose = require('mongoose');
const { checkSMS } = require('./src/helpers/message');
const messageHelper = require('./src/helpers/message');
const SmsInfo = require('./src/models/smsInfo');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});


const repoSchedule = require("./src/repositories/schedule");


async function getAllData() {
    const data = await repoSchedule.getAllSchedule()

    let arr = [];
     data.forEach(async element => {       
        const messageStatus = await messageHelper.sendSMS(element.list_recipient.toString())
        if(Array.isArray(messageStatus)){
            messageStatus.forEach(msgElement => {
                arr.push({
                    schedule_id : element._id,
                    message_id : msgElement.message_id,
                    status : null
                })
                console.log(arr)
            });
        }else{
            arr.push({
                schedule_id : element._id,
                message_id : messageStatus.message_id,
                status : null
            })
        } 
        // SmsInfo.insertMany(arr), function (err,doc){
        //     if(err){
        //         console.log(err)
        //     }else{
        //         console.log(doc)
        //     }
        // }
    
    });

} 

async function bulkUpdate() {
    try {
        const data = await SmsInfo.find()
        data.splice(0,900)
        await Promise.all(data.map(async (element) => {
            do {
                var msgInfo = await messageHelper.checkSMS(element.id)
                element.status = msgInfo.status
            } while (element.status === 'ACCEPTD');
            let newData = await SmsInfo.update({message_id : element.id},element)
            console.log(newData)
        }))
    } catch (error) {
        console.log(error)
    }

}

bulkUpdate()
//getAllData()