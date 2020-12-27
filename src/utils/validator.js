const { body } = require('express-validator')

exports.registerValidator = [
    body('email')
        .isEmail().withMessage('Введите корректный email'),
        // .normalizeEmail(),
    body('password')
        .isLength({ min: 6, max: 56 }).withMessage('Пароль должен быть минимум 6 символов')
        .isAlphanumeric().withMessage('Пароль должен содержать буквы и цифры')
        .trim(),
    body('name').isLength(2).withMessage('Имя должно быть минимум 3 символа').trim()
]