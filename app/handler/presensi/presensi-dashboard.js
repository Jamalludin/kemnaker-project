const service = require('../../services')
const common = require('../../constants/constant')

async function presensiBeranda(req, res) {
    const dashboard = await service.presensiDashboardSvc.dashboardData(req)

    if (!dashboard) {
        return res.status(501).json({
            response_code: common.errorCode.BAD_IMPLEMENTATION,
            msg: "Terjadi Masalah Pada Server... Mohon Coba Beberapa Saat Lagi..."
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        data: dashboard
    })
}

module.exports = {
    presensiBeranda
}