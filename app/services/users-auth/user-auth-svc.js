const models = require('../../../models')
const {sequelize} = require('../../../models')
const bcrypt = require('bcryptjs');

const MstUser = models.mst_user

const findUser = async (req) => {
    try {
        const checkUser = await MstUser.findAll({where:{nik_user:req.body.nik}})

        return checkUser
    }catch (e) {
        console.error(e)
        return {
            code:5001
        }
    }
}

const addUser = async (req) => {
    const transaction = await sequelize.transaction()

    const cryptPassword = await bcrypt.hash(req.body.password, 10);

    const body = req.body

    try {
        const saveUser = await MstUser.create({
            nik_user: body.nik,
            nama_user: body.nama,
            password: cryptPassword
        })

        transaction.commit()
        return saveUser

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return false
    }
}

async function registerUser(req) {
    const regis = await findUser(req)
    if (regis.length > 0){
        return {
            code: 4004,
            msg: 'DATA_ADA'
        }
    }

    const add = await addUser(req)

    if (!add) {
        return {
            code: 5001
        }
    }

    return add
}

module.exports = {
    registerUser
}
