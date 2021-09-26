const service = require('../../services')
const common = require('../../constants/constant')

async function userAuthLogout(req, res) {
    const logout = await service.userAuth.userLogout(req)

    if (logout.code && logout.code === common.codeMsg.ERROR_QUERY) {
        return res.status(503).json({
            code: common.errorCode.SERVER_UNAVAILABLE,
            code_msg:'Terjadi Masalah, Cobalah Beberapa Saat Lagi...'
        })
    }

    if (logout.code && logout.code === common.codeMsg.DATA_NOT_FOUND) {
        return res.status(503).json({
            code: common.errorCode.DATA_NOT_FOUND,
            code_msg:'Maaf. NIK Anda Tidak Terdaftar...'
        })
    }

    if (logout.code && logout.code === common.codeMsg.USER_IN_ACTIVE) {
        return res.status(401).json({
            code: common.codeMsg.USER_IN_ACTIVE,
            code_msg:'Maaf. Akun Anda Sudah Tidak Aktive...'
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        response_msg: 'SUCCESS_LOGOUT'
    })
}

module.exports = {
    userAuthLogout
}