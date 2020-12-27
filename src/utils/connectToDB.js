const mongoose = require('mongoose')
const { MONGO_CONNECTION_STRING } = require('./config')

module.exports = cb => {
    mongoose.connect(MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    mongoose.set('useCreateIndex', true)

    const db = mongoose.connection
    db.on('error', () => console.error('Connection error'))
    db.once('open', () => {
        console.log('MongoDB connected')
        cb()
    })
}