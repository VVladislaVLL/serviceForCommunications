const express = require('express')
const app = express()
const helmet = require('helmet')

const authRoute = require('./routes/auth')

app.use(express.json())
app.use(helmet())

app.use('/api/auth', authRoute)


module.exports = app