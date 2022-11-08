const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const sign = (data) => {
    return jwt.sign({...data}, config.jwt.SECRET);
}

const check = {
    own: (req) => {
        const decoded = decodeHeader(req);
        if(String(decoded.id) !== String(req.body.id)) throw error('User Invalid', 401)
    },
    logget: (req) => {
        const decoded = decodeHeader(req);
    }
}

const verify = (token) => {
    return jwt.verify(token, config.jwt.SECRET)
}

const getToken = (auth) => {
    if(!auth) throw error('No viene token', 401);
    if(auth.indexOf("Bearer ") === -1) throw error('Invalid format', 401);
    const token = auth.replace("Bearer ", "");
    return token;
}

const decodeHeader = (req) => {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check
};