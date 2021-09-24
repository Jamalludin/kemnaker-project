const models = require('../../../models')
const {sequelize} = require('../../../models')
const moment = require('moment')
const common = require("../../constants/constant");

const activty = models.activty

async function activtyUpdate (req) {
    const transaction = await sequelize.transaction()
    const id = req.params.id
    const body = req.body

    const data = {
        aktifitas: body.aktifitas,
        waktu: moment(body.waktu, 'DD-MM-YYYY HH:mm:ss')
    }

    try {
        const checkData = await activty.findByPk(id)
        if (!checkData) {
            return {
                code: common.errorCode.DATA_NOT_FOUND
            }
        }

        const updateActivity = await activty.update(data,{
            where: {id: id}
        })

        transaction.commit()
        return updateActivity

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    activtyUpdate
}