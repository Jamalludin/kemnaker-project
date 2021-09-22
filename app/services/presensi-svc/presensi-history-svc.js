const models = require('../../../models')
const {sequelize} = require('../../../models')
const saveImage = require('../../constants/utility')

const user = models.mst_user
const history = models.history
const activity = models.activty

const relations = (relationShip) => {
    return [
        {
            model: history,
            attributes: [
                ['id', 'id_history'],
                'latitude',
                'longitude',
                'status',
                'foto_selfie',
                'foto_ttd',
                'catatan'
            ],
            required: true
        },
        {
            model: activity,
            attributes: [
                ['id', 'id_activity'],
                'aktifitas',
                'waktu'
            ],
            required: true
        }
    ]
}

async function absenHistory (req) {
    const transaction = await sequelize.transaction()

    try {
        const checkHistory = await history.findAll({where:{id_user:id}})


        transaction.commit()
        return saveAbsen

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    absenHistory
}