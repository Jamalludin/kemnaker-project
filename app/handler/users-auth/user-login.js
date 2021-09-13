const models = require('../../../models');

async function userAuthLogin(req, res) {
    return res.status(200).json({
        response_code: "JAMAL"
    })
}

module.exports = {
    userAuthLogin
}