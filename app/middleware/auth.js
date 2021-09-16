const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const common = require('../constants/constant')
const Moment = require('moment')

const verifyToke = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return res.status(403).json({
            response_code: common.errorCode.BAD_REQUEST,
            msg: 'token is required for authentication'
        })
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_SECRET_KEY)

        const dateExp = Moment.unix(decoded.exp).format("HH:ss")
        const dateNow = Moment(new Date()).format("HH:ss")

        if (dateNow > dateExp) {
            return res.status(402).json({
                response_code: common.errorCode.TOKEN_EXP,
                msg: 'Token Is Exp'
            })
        }

        req.user = decoded

    } catch (err) {
        return res.status(401).json({
            response_code: common.errorCode.NOT_ACCEPTABLE,
            msg: 'Invalid Token'
        })
    }
    return next()
}

module.exports = verifyToke