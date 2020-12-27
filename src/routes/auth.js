const router = require('express').Router()
const controller = require('../controller/auth')

router.post('/', controller.register)
router.post('/', controller.login)

module.exports = router