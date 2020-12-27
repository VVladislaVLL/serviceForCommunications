const bcrypt = require('bcryptjs')
const User = require('../models/User')
const createToken = require('../utils/createJWT')
const { DEFAULT_SALT_ROUND } = require('../utils/config')

module.exports = {
    login: async function (req, res) {
        try {
            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            
            if (candidate) {
                const areSame = await bcrypt.compare(password, candidate.password)
                if (areSame) {
                    const token = createToken(email, candidate._id)
                    
                    res.status(200).json({
                        message: `Bearer ${token}`
                    })
                } else {
                    res.status(401).json({
                        message: 'Incorrect password'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
        } catch (e) {
            console.error(e)
        }
    },
    register: async function(req, res) {
        try {
            const { email, password } = req.body
            const candidate = await User.findOne({ email })
    
            if (candidate) {
                res.status(409).json({
                    message: 'User already exists'
                })
            } else {
                const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUND)
                const hashPassword = await bcrypt.hash(password, salt)
                const user = new User({ email, password: hashPassword })
    
                await user.save()
                res.status(201).json(user)
            }
        } catch (e) {
            console.error(e)
        }
    }
}