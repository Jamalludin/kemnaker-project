const service = require('../../services')
const common = require('../../constants/constant')

async function viewActivity(req, res) {

    const viewActivity = await service.activityViewSvc.activtyView(req)

    if (!viewActivity) {
        return res.status(503).json({
            code: common.errorCode.SERVER_UNAVAILABLE,
            code_msg:'Terjadi Masalah, Cobalah Beberapa Saat Lagi...'
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        data: viewActivity
    })
}

module.exports = {
    viewActivity
}