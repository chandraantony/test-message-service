const mongoose = require('mongoose');
const moment = require('moment');

const date = moment().format('YYMMDDhhmm')

const messageInfo = mongoose.Schema({
    schedule_id : {
        type :String,
        required : true 
    },
    message_id : {
        type : String,
        required : true
    },
    delivery_time : {
        type : String,
        default : date
    },
    status : {
        type : String,
    }
})

const SmsInfo = module.exports = mongoose.model('SmsInfo', messageInfo)