const express = require('express')
const router = express.Router()
const handler = require('../../handler')
const auth = require("../../middleware/auth")

router.post('/auth/login', handler.userAuthLogin.userAuthLogin)

router.post('/auth/register', handler.userAuthRegister.userAuthRegister)

router.post('/auth/logout', auth, handler.userAuthLogout.userLogout)

module.exports = router
