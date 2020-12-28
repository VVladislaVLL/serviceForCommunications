const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { validationResult } = require('express-validator')
const User = require('../models/User')
const createToken = require('../utils/createJWT')
const { DEFAULT_SALT_ROUND } = require('../utils/config')
const errorHandler = require('../utils/errorHandler')
const { registration, reset } = require('../utils/mail')

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "805206ebdc01e5",
        pass: "b2d1c1a150f9a0"
    }
})

module.exports = {
    login: async function (req, res) {
        try {
            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            
            if (candidate) {
                const confirmed = candidate.confirmed
                if (confirmed) {
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
                    res.status(400).json({
                        message: 'Ваш аккаунт не подтвержден'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
        } catch (e) {
            console.error(e)
            errorHandler(500, 'Internal Server Error', res)
        }
    },
    register: async function(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return errorHandler(422, errors.array()[0].msg, res)
        }

        try {
            const { email, password, name } = req.body
            const candidate = await User.findOne({ email })
    
            if (candidate) {
                res.status(409).json({
                    message: 'User already exists'
                })
            } else {
                const salt = await bcrypt.genSalt(+DEFAULT_SALT_ROUND)
                const hash = await bcrypt.hash(Date.now().toString(), salt)
                const hashPassword = await bcrypt.hash(password, salt)
                const user = new User({ 
                    email, 
                    password: hashPassword, 
                    name,
                    avatar: req.file ? req.file.path : '',
                    hash
                })

                await user.save()
                res.status(201).json(user)
                await transport.sendMail(registration(email, user.hash))
            }
        } catch (e) {
            console.error(e)
            errorHandler(500, 'Internal Server Error', res)
        }
    },
    delete: async function(req, res) {
        try {
            await User.deleteOne({ _id: req.params.id })
            
            res.status(200).json({
                message: 'User were deleted'
            })
        } catch (e) {
            console.error(e)
            errorHandler(500, 'Internal Server Error', res)
        }
    },
    verify: async function(req, res) {
        try {   
            const hash = req.query.hash
            if (!hash) {
                return res.status(422).json({ 
                    message: "Invalid hash" 
                })
            } else {
                const user = await User.findOne({ hash })

                if (!user) {
                    return res.status(404).json({
                        message: 'User not found'
                    })
                } 

                user.confirmed = true
                await user.save()
                res.status(200).json({
                    message: 'Аккаунт успешно подтвержден!'
                })
            }   
        } catch (e) {
            errorHandler(500, 'Internal Server Error', res)
        }
    },
    reset: function(req, res) {
        try {
            crypto.randomBytes(32, async (err, buffer) => {
                if (err) {
                    return errorHandler(400, err, res)
                }

                const hash = buffer.toString('hex')
                const candidate = await User.findOne({ email: req.body.email })
                if (candidate) {
                    candidate.hash = hash
                    candidate.hashExp = Date.now() + 3600 * 1000
                    await candidate.save()
                    res.status(200).json({
                        message: 'Письмо с восстановлением пароля отправлено вам на почту'
                    })
                    await transport.sendMail(reset(candidate.email, hash))
                } else {
                    res.status(404).json({
                        message: 'Такого email не существует'
                    })
                }
            })
        } catch (e) {
            errorHandler(500, 'Internal Server Error', res)
        }
    },
    resetPage: async function(req, res) {
        
    },
    resetPassword: function (req, res) {

    }
}