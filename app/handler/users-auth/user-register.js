const service = require('../../services')

async function userAuthRegister(req, res) {
    if (req.body.password !== req.body.re_password) {
        return res.status(500).json({
            code:'BI',
            code_msg: 'Password Tidak Sama'
        })
    }

    const register = await service.userAuth.registerUser(req)

    if (register.code === 4004) {
        return res.status(406).json({
            code:'NA',
            code_msg:'NIK_SUDAH_TERDAFTAR'
        })
    }

    if (register.code === 5001) {
        return res.status(503).json({
            code:'SU',
            code_msg:'Terjadi Masalah, Cobalah Beberapa Saat Lagi...'
        })
    }

    return res.status(200).json({
        response_code: "SC",
        data: register
    })
}

module.exports = {
    userAuthRegister
}