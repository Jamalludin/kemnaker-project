const models = require('../../../models')
const {sequelize} = require('../../../models')
const common = require('../../constants/constant')

const activty = models.activty

async function activtyDelete (req) {
    const transaction = await sequelize.transaction()
    const id = req.params.id

    try {
        const checkData = await activty.findByPk(id)
        if (!checkData) {
            return {
                code: common.errorCode.DATA_NOT_FOUND
            }
        }

        const deleteActivity = await activty.destroy({
            where: {id: id}
        })

        transaction.commit()
        return deleteActivity

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    activtyDelete
}