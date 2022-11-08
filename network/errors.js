const response = require('./response');

const errors = (err, req, res, next) => {
    console.error(err);
    const message = err.message || "Internal Error";
    const statusCode = err.statusCode || 500;
    response.error(req, res, message, statusCode)
}

module.exports = errors;