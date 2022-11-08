const store = require('../../../store/mysql');
const controller = require('./controller');

const injectedStore = store;

module.exports = controller(injectedStore);