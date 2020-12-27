module.exports = {
    registration: function(email, hash) {
        return {
            to: email,
            from: 'communication@service.com',
            subject: 'Создание аккаунта',
            html: `
                Для того, чтобы подтвердить почту, перейдите 
                <a href="http://localhost:5000/auth/verify?hash=${hash}">
                по этой ссылке</a>
            `
        }
    },
    reset: function(email, hash) {
        return {
            to: email,
            from: '',
            subject: 'Восстановление доступа',
            html: `
                <h1>Забыли пароль?</h1>
                <p>Нажмите на ссылку ниже:</p>
                <a href="http://localhost:5000/auth/reset?hash=${hash}">Восстановить доступ</a>
            `
        }
    }
}