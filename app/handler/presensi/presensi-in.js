const service = require('../../services')
const common = require('../../constants/constant')

async function absenMasuk(req, res) {
    const saveAbsen = await service.presensiInSvc.userAbsen(req)

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        data: saveAbsen
    })
}

module.exports = {
    absenMasuk
}