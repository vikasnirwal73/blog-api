module.exports = (err, res, message) => {
    return res.status(err.status || 500).json({
        message: message || 'Something went wrong!',
        error: err
    });
}