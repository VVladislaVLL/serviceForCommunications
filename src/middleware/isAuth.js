const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../utils/config')

module.exports = function isAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: 'Access token is missing or invalid'
        })
    }

    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer' && token) {
        jwt.verify(token, JWT_SECRET_KEY, err => {
            if (err) {
                return res.status(401).json({
                    message: 'Access token is missing or invalid'
                })
            }
            return next()
        })
    } else {
        return res.status(401).json({
            message: 'Access token is missing or invalid'
        })
    }
}