const axios = require('axios');
const { baseUrl } = require('./constants');

function checkSMS(msgId){
    return axios({
        method: 'get',
        url: baseUrl+'/api',
        params: {
            messageId: msgId
        },
    })
    .then( response => {
        return response.data
    })
    .catch((error) => {
        return error
    });
}

function sendSMS(phoneNumber,msg) {
    return axios({
        method: 'post',
        url: baseUrl+'/api',
        data : {
            dnis : phoneNumber,
            message : msg
        }
    })
    .then( response => {
        return response.data
    })
    .catch((error) => {
        return error
    });
}


module.exports = {
    checkSMS,
    sendSMS
}