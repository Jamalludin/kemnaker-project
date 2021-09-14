const service = require('../../services')
const common = require('../../constants/constant')

async function userAuthRegister(req, res) {
    if (req.body.password !== req.body.re_password) {
        return res.status(400).json({
            code: common.errorCode.BAD_REQUEST,
            code_msg: 'Password Tidak Sama'
        })
    }

    const register = await service.userAuth.registerUser(req)

    if (register.code && register.code === common.codeMsg.DATA_FOUND) {
        return res.status(406).json({
            code: common.errorCode.NOT_ACCEPTABLE,
            code_msg:'NIK_SUDAH_TERDAFTAR'
        })
    }

    if (register.code && register.code === common.codeMsg.ERROR_QUERY) {
        return res.status(503).json({
            code: common.errorCode.SERVER_UNAVAILABLE,
            code_msg:'Terjadi Masalah, Cobalah Beberapa Saat Lagi...'
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        data: register
    })
}

module.exports = {
    userAuthRegister
}