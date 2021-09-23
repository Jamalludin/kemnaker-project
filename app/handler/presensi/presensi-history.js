const service = require('../../services')
const common = require('../../constants/constant')

async function historyAbsen(req, res) {
    const historyAbsen = await service.presensiHistorySvc.absenHistory(req)

    if (!historyAbsen) {
        return res.status(501).json({
            response_code: common.errorCode.BAD_IMPLEMENTATION,
            msg: "Terjadi Masalah Pada Server... Mohon Coba Beberapa Saat Lagi..."
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        data: historyAbsen
    })
}

module.exports = {
    historyAbsen
}