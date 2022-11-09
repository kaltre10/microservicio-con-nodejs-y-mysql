const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.cacheServices.HOST, config.cacheServices.PORT);