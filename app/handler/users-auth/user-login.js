const service = require('../../services')
const common = require('../../constants/constant')

async function userAuthLogin(req, res) {
    const login = await service.userAuth.userLogin(req)

    if (login.code && login.code === common.codeMsg.ERROR_QUERY) {
        return res.status(503).json({
            code: common.errorCode.SERVER_UNAVAILABLE,
            code_msg:'Terjadi Masalah, Cobalah Beberapa Saat Lagi...'
        })
    }

    if (login.code && login.code === common.codeMsg.DATA_NOT_FOUND) {
        return res.status(503).json({
            code: common.errorCode.DATA_NOT_FOUND,
            code_msg:'Maaf. NIK Anda Tidak Terdaftar...'
        })
    }

    if (login.code && login.code === common.codeMsg.USER_IN_ACTIVE) {
        return res.status(401).json({
            code: common.codeMsg.USER_IN_ACTIVE,
            code_msg:'Maaf. Akun Anda Sudah Tidak Aktive...'
        })
    }

    if (login.code && login.code === common.codeMsg.PASSWORD_NOT_MATCH) {
        return res.status(503).json({
            code: common.errorCode.NOT_ACCEPTABLE,
            code_msg:'Maaf. Pastikan NIK / Password Anda Benar...'
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        datas: login
    })
}

module.exports = {
    userAuthLogin
}