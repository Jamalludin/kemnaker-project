const service = require('../../services')
const common = require('../../constants/constant')

async function userProfile(req, res) {
    const profile = await service.userProfile.profileUser(req)

    if (!profile) {
        return res.status(501).json({
            response_code: common.errorCode.BAD_IMPLEMENTATION,
            msg: "Terjadi Masalah Pada Server... Mohon Coba Beberapa Saat Lagi..."
        })
    }

    if (profile && profile.code === common.errorCode.DATA_NOT_FOUND) {
        return res.status(501).json({
            response_code: common.errorCode.DATA_NOT_FOUND,
            msg: "Data Profile Tidak Ditemukan..."
        })
    }

    return res.status(200).json({
        response_code: common.responseCode.SUCCESS_RESPONSE,
        data: profile
    })
}

module.exports = {
    userProfile
}