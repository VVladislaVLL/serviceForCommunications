const router = require('express').Router()
const controller = require('../controller/auth')
const { registerValidator, loginValidator, passwordValidator } = require('../utils/validator')
const upload = require('../middleware/upload')

router.get('/verify', controller.verify)
router.post('/register', upload.single('image'), registerValidator, controller.register)
router.post('/login', loginValidator, controller.login)
router.delete('/:id', controller.delete)
router.post('/reset', controller.reset)
router.get('/reset', controller.resetPage)
router.post('/password', passwordValidator, controller.password)

module.exports = router
