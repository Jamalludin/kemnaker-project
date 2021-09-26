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

const updatedUserStatus = async (user, authStatus) => {
    const transaction = await sequelize.transaction()

    try {
        const updatedUser = await MstUser.update({
            status: authStatus
        },{
            where: {
                id: user
            }
        })

        transaction.commit()
        return updatedUser

    }catch (e) {
        console.error(e)
        transaction.rollback()
        return {
            code: common.codeMsg.ERROR_QUERY
        }
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

    if (user && user.is_active === false) {
        return {
            code: common.codeMsg.USER_IN_ACTIVE
        }
    }

    const comparePassword = await bcrypt.compare(req.body.password, user.password)

    if (!comparePassword) {
        return {
            code: common.codeMsg.PASSWORD_NOT_MATCH
        }
    }

    const updateStatus = await updatedUserStatus(user.id,'LOGIN')
    if (updateStatus && updateStatus.code === common.codeMsg.ERROR_QUERY) {
        return {
            code: common.codeMsg.ERROR_QUERY
        }
    }

    let token = jwt.sign({user},config.TOKEN_SECRET_KEY,{expiresIn: "2h"})

    return {
        nama: user.nama_user,
        nik: user.nik_user,
        email: user.email,
        token: token
    }
}

async function userLogout (req) {
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

    if (user && user.is_active === false) {
        return {
            code: common.codeMsg.USER_IN_ACTIVE
        }
    }

    const updateStatus = await updatedUserStatus(user.id,'LOGOUT')
    if (updateStatus && updateStatus.code === common.codeMsg.ERROR_QUERY) {
        return {
            code: common.codeMsg.ERROR_QUERY
        }
    }

    return true
}

module.exports = {
    registerUser,
    userLogin,
    userLogout
}
