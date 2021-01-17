const router = require('express').Router()
const { v4: uuidv4 } = require('uuid')

router.get('/', (req, res) => {
    res.redirect(`/room/${uuidv4()}`)
})

router.get('/:id', (req, res) => {
    // socket logic

    res.status(200).json({ message: `Вы успешно присоединились в комнату ${req.params.id}` })
})

module.exports = router