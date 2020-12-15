require('dotenv').config(); 
const mongoose = require('mongoose');
const messageHelper = require('./src/helpers/message');
const SmsInfo = require('./src/models/smsInfo');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});


async function checkSmsAndUpdate() {
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

checkSmsAndUpdate()