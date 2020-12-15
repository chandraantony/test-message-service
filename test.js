const axios = require('axios');
const { baseUrl } = require('./src/helpers/constants');
function checkSMS(){
    return axios({
        method: 'get',
        url: baseUrl+'/api',
        params: {
            messageId: 'dc88cf47-eac5-427f-82f3-173d86795dec'
        },
    })
    .then( response => {
        return response.data
    })
    .catch((error) => {
        return error
    });
}

function sendSMS() {
    return axios({
        method: 'post',
        url: baseUrl+'/api',
        data : {
            dnis : "60123892322",
            message : "Test Message"
        }
    })
    .then( response => {
        return response.data
    })
    .catch((error) => {
        return error
    });
}

async function testing(){
    var a = await checkSMS()
    console.log(a)
}
testing()