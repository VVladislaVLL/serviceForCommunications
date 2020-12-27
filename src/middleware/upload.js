const multer = require('multer')
const path = require('path')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../', 'uploads'))
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})