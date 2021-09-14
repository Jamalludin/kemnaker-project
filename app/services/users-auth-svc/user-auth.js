const models = require('../../../models')
const {sequelize} = require('../../../models')
const bcrypt = require('bcryptjs')
const common = require('../../constants/constant')
const config = require('../../../config/config')
const jwt = require('jsonwebtoken')

const MstUser = models.mst_user

const findUser = async (req) => {
    try {
        const checkUser = await MstUser.findOne({where:{nik_user:req.body.nik}})

        return checkUser
    }catch (e) {
        console.error(e)
        return {
            code: common.codeMsg.ERROR_QUERY
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
            email:body.email,
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

async function registerUser (req) {
    const regis = await findUser(req)

    if (regis && regis.code === common.codeMsg.ERROR_QUERY) {
        return {
            code: common.codeMsg.ERROR_QUERY
        }
    }

    if (regis){
        return {
            code: common.codeMsg.DATA_FOUND,
            msg: 'DATA_ADA'
        }
    }

    const add = await addUser(req)

    if (!add) {
        return {
            code: common.codeMsg.ERROR_QUERY
        }
    }

    return add
}

async function userLogin (req) {
    const user = await findUser(req)

    if (user && user.code === common.codeMsg.ERROR_QUERY) {
        return {
            code: common.codeMsg.ERROR_QUERY
        }
    }

    if (!user) {
        return {
            code: common.codeMsg.DATA_NOT_FOUND
        }
    }

    const comparePassword = await bcrypt.compare(req.body.password, user.password)

    if (!comparePassword) {
        return {
            code: common.codeMsg.PASSWORD_NOT_MATCH
        }
    }

    let token = jwt.sign({user},config.TOKEN_SECRET_KEY,{expiresIn: "2h"})

    return {
        nama: user.nama_user,
        nik: user.nik_user,
        email: user.email,
        status: user.status,
        token: token
    }
}

module.exports = {
    registerUser,
    userLogin
}
