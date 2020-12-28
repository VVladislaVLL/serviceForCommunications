const bcrypt = require('bcryptjs')
const { DEFAULT_SALT_ROUND } = require('./config')

module.exports = {
    hash: async function(data) {
        const salt = await bcrypt.genSalt(+DEFAULT_SALT_ROUND)
        const hashData = await bcrypt.hash(data, salt)
    
        return hashData
    },
    compare: async function(dataGiven, dataHash) {
        return await bcrypt.compare(dataGiven, dataHash)
    }
}
