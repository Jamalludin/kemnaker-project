const models = require('../../../models')
const {sequelize} = require('../../../models')

const activty = models.activty

async function activtyView (req) {
    const transaction = await sequelize.transaction()
    const id = req.user.user.id
    const query = req.query

    const pagination = {
        limit: Number(query.limit),
        offset: Number(query.offset)
    }

    try {
        const viewActivity = await activty.findAndCountAll({
            where: {id_user: id},
            ...pagination
        })

        transaction.commit()
        return viewActivity

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    activtyView
}