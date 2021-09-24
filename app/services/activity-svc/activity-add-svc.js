const models = require('../../../models')
const {sequelize} = require('../../../models')
const moment = require('moment')

const activty = models.activty

async function activtyAdd (req) {
    const transaction = await sequelize.transaction()
    const id = req.user.user.id
    const body = req.body

    const data = {
        id_user: id,
        aktifitas: body.aktifitas,
        waktu: moment(body.waktu, 'DD-MM-YYYY HH:mm:ss')
    }

    try {
        const saveActivity = await activty.create(data)

        transaction.commit()
        return saveActivity

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    activtyAdd
}