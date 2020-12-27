const app = require('./app')
const connectToDB = require('./utils/connectToDB')
const { PORT } = require('./utils/config')

connectToDB(() => {
    app.listen(PORT, () => {
        console.log(`Server has been started on ${PORT} port`)
    })
})
