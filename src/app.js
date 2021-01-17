const express = require('express')
const app = express()
const helmet = require('helmet')
const isAuth = require('./middleware/isAuth')

const authRoute = require('./routes/auth')
const roomRoute = require('./routes/room')

app.use(express.json())
app.use(helmet())

app.use('/auth', authRoute)
app.get('/', (req, res) => {
    res.send('Happy New Year!')
})
app.use(isAuth)
app.use('/room', roomRoute)


module.exports = app