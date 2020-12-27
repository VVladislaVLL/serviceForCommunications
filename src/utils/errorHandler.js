module.exports = (status, err, res) => {
    res.status(status).json({
        message: err
    })
}