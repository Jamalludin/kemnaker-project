const service = require('../../services')
const common = require('../../constants/constant')

async function absenKeluar(req, res) {
    const saveAbsen = await service.presensiOutSvc.userAbsenOut(req)

    if (!saveAbsen) {
        return res.status(501).json({
            response_code: common.errorCode.BAD_IMPLEMENTATION,
            msg: "Terjadi Masalah Pada Server... Mohon Coba Beberapa Saat Lagi..."
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        msg: "Anda Sudah Absen Hari Ini..."
    })
}

module.exports = {
    absenKeluar
}