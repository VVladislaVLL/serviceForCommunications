const express = require('express')
const app = express()
const helmet = require('helmet')
const isAuth = require('./middleware/isAuth')

const authRoute = require('./routes/auth')

app.use(express.json())
app.use(helmet())

app.use('/auth', authRoute)
app.use(isAuth)
app.get('/', (req, res) => {
    res.send('Service is working')
})


module.exports = app