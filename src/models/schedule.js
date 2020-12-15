const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    running_time : {
        type :String,
        required : true 
    },
    message : {
        type : String,
        required : true
    },
    list_recipient : {
        type : Array,
        default : [],
        required : true
    },
    status : {
        type : Number,
        default : 0,
        required : true
    }
})

const Schedule = module.exports = mongoose.model('Schedule', scheduleSchema)