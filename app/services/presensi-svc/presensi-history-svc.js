const models = require('../../../models')
const {sequelize} = require('../../../models')
const saveImage = require('../../constants/utility')

const user = models.mst_user
const history = models.history

async function absenHistory (req) {
    const transaction = await sequelize.transaction()
    const id = req.user.user.id

    const pagination = {
        limit: Number(req.query.limit),
        offset: Number(req.query.offset)
    }

    try {
        const checkHistory = await history.findAndCountAll({
            where:{id_user:id},
            ...pagination
        })

        transaction.commit()
        return checkHistory

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    absenHistory
}