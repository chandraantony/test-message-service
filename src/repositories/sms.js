const Sms = require('../models/smsInfo')

exports.getSms = (perPage,page,usersProjection,time,status) => {
    let promise;
    if ( time != undefined && time != null && time != "" && status != null && status != undefined && status != "") {
        promise =  Sms.find({status :status, running_time :time},usersProjection).limit(perPage).skip(perPage * page).exec() 
    } else if  ( time != undefined && time != null && time != "" ) {
        promise =  Sms.find({running_time : time},usersProjection).limit(perPage).skip(perPage * page).exec() 
    } else if  ( status != null && status != undefined && status != "" ) {
        promise =  Sms.find({status : status},usersProjection).limit(perPage).skip(perPage * page).exec() 
    } else {
        promise =  Sms.find({},usersProjection).limit(perPage).skip(perPage * page).exec()   
    }         
    return promise
    .then((doc) => {
        return doc
    }).catch((err) => {
        return err
    });

}

exports.getAllSms = (usersProjection,time,status) => {
    let promise;
    if ( time != undefined && time != null && time != "" && status != null && status != undefined && status != "") {
        promise =  Sms.find({status :status, running_time :time},usersProjection).exec() 
      } else if  ( time != undefined && time != null && time != "" ) {
        promise =  Sms.find({running_time : time},usersProjection).exec() 
      } else if  ( status != null && status != undefined && status != "" ) {
        promise =  Sms.find({status : status},usersProjection).exec() 
      } else {
        promise =  Sms.find({},usersProjection).exec()   
      }
    return promise
    .then((result) => {
        return result
    }).catch((err) => {
        return err
    });
}

exports.countData = (time,status) => {
    let promise;
    if ( time != undefined && time != null && time != "" && status != null && status != undefined && status != "") {
        promise =  Sms.find({status :status, running_time :time}).countDocuments().exec()  
      } else if  ( time != undefined && time != null && time != "" ) {
        promise =  Sms.find({running_time : time}).countDocuments().exec() 
      } else if  ( status != null && status != undefined && status != "" ) {
        promise =  Sms.find({status : status}).countDocuments().exec()  
      } else {
        promise =  Sms.countDocuments().exec()  
      }
    return promise
    .then((doc) => {
        console.log(doc)
        return doc
    }).catch((err) => {
        return err
    });
}

exports.findById = (id) => {
    let promise = Sms.findOne({ message_id: id })
    return promise
    .then((doc) => {
        return doc
    }).catch((err) => {
        return err
    });
}