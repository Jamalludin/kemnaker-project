const express = require('express')
const router = express.Router()
const handler = require('../../handler')
const auth = require("../../middleware/auth")

router.post('/add', auth, handler.activityAdd.activityAdd)

router.get('/view', auth, handler.activityView.viewActivity)

router.get('/detail/:id', auth, handler.activityDetail.detailActivity)

router.put('/update/:id', auth, handler.activityUpdate.activityUpdate)

router.delete('/delete/:id', auth, handler.activityDelete.activityDelete)

module.exports = router;