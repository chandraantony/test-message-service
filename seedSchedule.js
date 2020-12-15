require('dotenv').config(); 

const moment = require('moment')

const Schedule = require('./src/models/schedule');
const mongoose = require('mongoose')

var phoneNumber = ['6123123123','6123712323','6723623','6123323']
var todayDate = moment().format('YYMMDD')
const currentHour = new Date().getHours()

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function formater(arg){
    if(arg < 10){
        return 0+arg.toString()
    }
    return arg.toString()
}

function getRandomPhone(length){
    let arr = []
    for(var i=0; i<length; i++){
        arr.push(phoneNumber[i])
    }
    return arr
}
  
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const totalData = 100;
var arr = []
for(var i=0; i < totalData; i++){
    var hour = formater(getRandomInt(currentHour+1,24)) 
    var min = formater(getRandomInt(1,60)) 
    arr.push({
            running_time: todayDate+hour+min,
            message : "Test Message",
            list_recipient : getRandomPhone(getRandomInt(1,phoneNumber.length)),
            status : 0
        })
}

Schedule.insertMany(arr,(err,doc) => {
    if(err){
        console.log(err)
        process.exit()
    }else{
        console.log(doc)
        process.exit()
    }
})


//console.log(arr)