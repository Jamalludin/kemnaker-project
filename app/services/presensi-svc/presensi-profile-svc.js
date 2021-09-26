const models = require('../../../models')
const {sequelize} = require('../../../models')
const common = require('../../constants/constant')

const mstUser = models.mst_user

async function profileUser (req) {
    const transaction = await sequelize.transaction()
    const id = req.user.user.id

    try {
        const checkProfile = await mstUser.findByPk(id)
        if (!checkProfile) {
            return {
                code: common.errorCode.DATA_NOT_FOUND
            }
        }

        const data = {
            nik: checkProfile.nik_user,
            nama: checkProfile.nama_user,
            img_url: checkProfile.img_url,
            email: checkProfile.email,
        }

        transaction.commit()
        return data

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    profileUser
}