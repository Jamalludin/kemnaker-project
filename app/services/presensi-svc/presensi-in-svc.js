const models = require('../../../models')
const {sequelize} = require('../../../models')
const saveImage = require('../../constants/utility')

const history = models.history

async function userAbsenIn (req) {
    const transaction = await sequelize.transaction()

    const body = req.body
    const user = req.user.user

    try {
        const saveSelfie = await saveImage.uploadImage(body.selfie, user.nik_user, 'selfie')
        const saveSignature = await saveImage.uploadImage(body.signature, user.nik_user, 'signature')

        const data = {
            id_user: user.id,
            latitude: body.location.latitude,
            longitude: body.location.longitude,
            status: body.status,
            foto_selfie: saveSelfie.location.concat(saveSelfie.fileName),
            foto_ttd: saveSignature.location.concat(saveSignature.fileName),
            catatan: body.catatan,
            waktu_masuk: new Date()
        }

        const saveAbsen = await history.create(data)

        transaction.commit()
        return saveAbsen

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    userAbsenIn
}
