const {body} = require('express-validator')

exports.registerValidator = [
  body('email')
    .isEmail().withMessage('Введите корректный email'),
  body('password')
    .isLength({min: 6, max: 56}).withMessage('Пароль должен быть минимум 6 символов')
    .isAlphanumeric().withMessage('Пароль должен содержать буквы и цифры')
    .trim(),
  body('name').isLength({min: 3}).withMessage('Имя должно быть минимум 3 символа').trim()
]

exports.loginValidator = [
  body('email')
    .isEmail().withMessage('Введите корректный email'),
  body('password')
    .isLength({min: 6, max: 56}).withMessage('Пароль должен быть минимум 6 символов')
    .isAlphanumeric().withMessage('Пароль должен содержать буквы и цифры')
    .trim(),
]

exports.passwordValidator = [
  body('password')
    .isLength({min: 6, max: 56}).withMessage('Пароль должен быть минимум 6 символов')
    .isAlphanumeric().withMessage('Пароль должен содержать буквы и цифры')
    .trim(),
]
