const Schedule = require('../models/schedule')

exports.getSchedule = (perPage,page,usersProjection,time,status) => {
    let promise;
    if ( time != undefined && time != null && time != "" && status != null && status != undefined && status != "") {
      promise =  Schedule.find({status :status, running_time :time},usersProjection).limit(perPage).skip(perPage * page).exec() 
      } else if  ( time != undefined && time != null && time != "" ) {
        promise =  Schedule.find({running_time : time},usersProjection).limit(perPage).skip(perPage * page).exec() 
      } else if  ( status != null && status != undefined && status != "" ) {
        promise =  Schedule.find({status : status},usersProjection).limit(perPage).skip(perPage * page).exec() 
      } else {
        promise =  Schedule.find({},usersProjection).limit(perPage).skip(perPage * page).exec()   
      }         
    return promise
    .then((doc) => {
        console.log(doc)
        return doc
    }).catch((err) => {
        console.log(err)
        return err
    });

}

exports.getAllSchedule = (usersProjection,time,status) => {
    let promise;
    if ( time != undefined && time != null && time != "" && status != null && status != undefined && status != "") {
          promise =  Schedule.find({status :status, running_time :time},usersProjection).exec() 
        } else if  ( time != undefined && time != null && time != "" ) {
          promise =  Schedule.find({running_time : time},usersProjection).exec() 
        } else if  ( status != null && status != undefined && status != "" ) {
          promise =  Schedule.find({status : status},usersProjection).exec() 
        } else {
          promise =  Schedule.find({},usersProjection).exec()   
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
        promise =  Schedule.find({status :status, running_time :time}).countDocuments().exec() 
      } else if  ( time != undefined && time != null && time != "" ) {
        promise =  Schedule.find({running_time : time}).countDocuments().exec() 
      } else if  ( status != null && status != undefined && status != "" ) {
        promise =  Schedule.find({status : status}).countDocuments().exec()  
      } else {
        promise =  Schedule.countDocuments().exec() 
      }
    return promise
    .then((doc) => {
        return doc
    }).catch((err) => {
        return err
    });
}

exports.findById = (id) => {
    let promise = Schedule.findById(id).exec();
    return promise
    .then((doc) => {
        return doc
    }).catch((err) => {
        return err
    }); 
}