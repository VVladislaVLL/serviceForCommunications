const router = require('express').Router()
const controller = require('../controller/auth')
const { registerValidator } = require('../utils/validator')
const upload = require('../middleware/upload')

router.post('/register', registerValidator, upload.single('image'), controller.register)
router.post('/login', controller.login)

module.exports = router