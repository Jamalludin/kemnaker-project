const service = require('../../services')
const common = require('../../constants/constant')

async function activityDelete(req, res) {

    const deleteActivity = await service.activityDeleteSvc.activtyDelete(req)

    if (deleteActivity && deleteActivity.code === common.errorCode.DATA_NOT_FOUND) {
        return res.status(401).json({
            code: common.errorCode.DATA_NOT_FOUND,
            code_msg:'Data Aktifitas Tidak Di Temukan...'
        })
    }

    if (!deleteActivity) {
        return res.status(503).json({
            code: common.errorCode.SERVER_UNAVAILABLE,
            code_msg:'Terjadi Masalah, Cobalah Beberapa Saat Lagi...'
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        code_msg: 'Data Aktivitas Berhasil Di Hapus...'
    })
}

module.exports = {
    activityDelete
}