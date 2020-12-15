const repoSms = require('../repositories/sms')

exports.getByiD = async (req,res) =>{
    const id = req.params.id
    try {
        const data = await repoSms.findById(id)
        res.json({data})
    } catch (error) {
        next(error)
    }
}

exports.getSms = async (req,res) => { 
    const perPage = parseInt(req.query.perPage) || 10;
    const page = Math.max(0, req.query.page-1 || 0);
    const time = req.query.filter_date
    const status = req.query.filter_status
    const usersProjection = { __v: false, _id :false }
    try {
        if(req.query.page == 0){
            const data = await repoSms.getAllSms(usersProjection,time,status)
            res.json({
                data :data,
                total_row : data.length
            })

        }else{
            const data = await repoSms.getSms(perPage,page,usersProjection,time,status);
            const totalData = await repoSms.countData(time,status);
            res.json({
                data : data,
                total_row : data.length,
                total_data : totalData,
                current_page : page+1,
                total_page : Math.ceil(totalData/perPage)
            })
        }
    } catch (error) {
        next(error)
    }
}