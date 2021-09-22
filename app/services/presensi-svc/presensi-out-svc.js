const models = require('../../../models')
const {sequelize} = require('../../../models')
const saveImage = require('../../constants/utility')

const history = models.history

async function userAbsenOut (req) {
    const transaction = await sequelize.transaction()

    const body = req.body
    const id = req.params.id
    const user = req.user.user

    try {
        const checkHistory = await history.findAll({where:{id_user:id}})
        const lastIndex = checkHistory[checkHistory.length -1]

        const saveSelfie = await saveImage.uploadImage(body.selfie, user.nik_user, 'selfie')
        const saveSignature = await saveImage.uploadImage(body.signature, user.nik_user, 'signature')

        const data = {
            latitude: body.location.latitude,
            longitude: body.location.longitude,
            status: body.status,
            foto_selfie: saveSelfie.location.concat(saveSelfie.fileName),
            foto_ttd: saveSignature.location.concat(saveSignature.fileName),
            catatan: body.catatan,
            waktu_keluar: new Date()
        }

        const saveAbsen = await history.update(data,{where:{id:lastIndex.id}})

        transaction.commit()
        return saveAbsen

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

module.exports = {
    userAbsenOut
}