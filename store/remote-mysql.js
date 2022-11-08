const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.MysqlServices.HOST, config.MysqlServices.PORT);