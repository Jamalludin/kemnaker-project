const service = require('../../services')
const common = require('../../constants/constant')

async function activityAdd(req, res) {

    const addActivity = await service.activityAddSvc.activtyAdd(req)

    if (!addActivity) {
        return res.status(503).json({
            code: common.errorCode.SERVER_UNAVAILABLE,
            code_msg:'Terjadi Masalah, Cobalah Beberapa Saat Lagi...'
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        data: addActivity
    })
}

module.exports = {
    activityAdd
}