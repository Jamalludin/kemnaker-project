const service = require('../../services')
const common = require('../../constants/constant')

async function absenMasuk(req, res) {
    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        data: req.user
    })
}

module.exports = {
    absenMasuk
}