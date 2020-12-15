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
        await Promise.all(data.map(async (element) => {
            do {
                var msgInfo = await messageHelper.checkSMS(element.id)
                element.status = msgInfo.status
            } while (element.status === 'ACCEPTD');
            await SmsInfo.findOneAndUpdate({message_id : element.message_id},{ $set: { status: element.status } }, {"new": true}, (error, doc) => {
                if(error){
                    console.log(error)
                }else{
                    console.log(doc)
                }
              });
        }))    
        
    } catch (error) {
        console.log(error)
    }

}

checkSmsAndUpdate().then((result) => {
    console.log('Done')
}).catch((err) => {
    console.log(err)
});