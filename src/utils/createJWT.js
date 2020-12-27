const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY, JWT_EXPIRES } = require('../utils/config')

module.exports = function createToken(email, userId) {
    return jwt.sign({ email, userId }, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRES})
}