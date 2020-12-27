const { Schema, model } = require('mongoose')
const crypto = require('crypto')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    hash: String
})

userSchema.pre('save', async function(next) {
    const user = this
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            return next()
        } else {
            const hash = buffer.toString('hex')
            user.hash = hash
        }
    })
})

module.exports = model('users', userSchema)