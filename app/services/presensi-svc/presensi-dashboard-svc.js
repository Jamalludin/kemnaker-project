const models = require('../../../models')
const {sequelize} = require('../../../models')

const history = models.history
const aktifitas = models.activty

async function dashboardData (req) {
    const transaction = await sequelize.transaction()
    const id = req.user.user.id

    try {
        const checkHistory = await history.findAll({where:{id_user:id}})

        const checkAktifitas = await aktifitas.findAll({where:{id_user:id}})

        const lastHistory = checkHistory[checkHistory.length - 1]
        const lastAktifitas = checkAktifitas[checkAktifitas.length - 1]

        const data = {
            lastAktifitas,
            lastHistory
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
    dashboardData
}