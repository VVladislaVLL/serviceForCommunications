const router = require('express').Router()
const controller = require('../controller/auth')
const { registerValidator } = require('../utils/validator')
const upload = require('../middleware/upload')

router.get('/verify', controller.verify)
router.post('/register', upload.single('image'), registerValidator, controller.register)
router.post('/login', controller.login)
router.delete('/:id', controller.delete)

module.exports = router