const { Schema, model } = require('mongoose')

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
    hash: String,
    hashExp: {
        type: Date,
        default: ''
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

// userSchema.pre('save', async function(next) {
//     const user = this
//     crypto.randomBytes(32, (err, buffer) => {
//         if (err) {
//             return next()
//         } else {
//             const hash = buffer.toString('hex')
//             user.hash = hash
//             return user
//         }
//     })
// })

module.exports = model('User', userSchema)