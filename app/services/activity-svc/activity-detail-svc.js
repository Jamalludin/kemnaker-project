const models = require('../../../models')
const {sequelize} = require('../../../models')
const common = require("../../constants/constant");

const activty = models.activty

async function activtyDetail (req) {
    const transaction = await sequelize.transaction()
    const id = req.params.id

    try {
        const detailActivity = await activty.findOne({
            where: {id: id}
        })

        if (!detailActivity) {
            return {
                code: common.errorCode.DATA_NOT_FOUND
            }
        }

        transaction.commit()
        return detailActivity

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    activtyDetail
}