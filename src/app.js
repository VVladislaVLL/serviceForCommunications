const express = require('express')
const app = express()
const helmet = require('helmet')

const authRoute = require('./routes/auth')

app.use(express.json())
app.use(helmet())

// app.use('/', )
// app.use(isAuth)
app.use('/auth', authRoute)


module.exports = app