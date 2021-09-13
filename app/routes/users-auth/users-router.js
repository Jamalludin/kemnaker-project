const express = require('express');
const router = express.Router();
const handler = require('../../handler');

/* GET home page. */
router.post('/auth/login', handler.userAuthLogin.userAuthLogin);

router.post('/auth/register', handler.userAuthRegister.userAuthRegister);

module.exports = router;
