const repoSchedule = require('../repositories/schedule')

exports.getByiD = async (req,res) =>{
    const id = req.params.id
    try {
        const data = await repoSchedule.findById(id)
        res.json({data})
    } catch (error) {
        next(error)
    }
}

exports.getScehdule = async (req,res,next) => {
    const perPage = parseInt(req.query.perPage) || 10;
    const page = Math.max(0, req.query.page-1 || 0);
    const time = req.query.filter_date
    const status = req.query.filter_status
    const usersProjection = { __v: false }
    try {
        if(req.query.page == 0){
            const data = await repoSchedule.getAllSchedule(usersProjection,time,status)
            res.json({
                data :data,
                total_row : data.length
            })

        }else{
            const data = await repoSchedule.getSchedule(perPage,page,usersProjection,time,status);
            const totalData = await repoSchedule.countData(time,status);
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