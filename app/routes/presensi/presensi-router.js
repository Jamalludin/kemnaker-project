const express = require('express')
const router = express.Router()
const handler = require('../../handler')
const auth = require("../../middleware/auth")

router.get('/beranda', auth, handler.presensiDashboard.presensiBeranda)

router.post('/in', auth, handler.presensiIn.absenMasuk)

router.put('/out/:id', auth, handler.presensiOut.absenKeluar)

router.get('/history', auth, handler.presensiHistory.historyAbsen)

router.get('/profile', auth, handler.presensiProfile.userProfile)

module.exports = router;