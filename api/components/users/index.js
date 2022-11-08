// const store = require('../../../store/mysql');
const store = require('../../../store/remote-mysql');
const controller = require('./controller');

const injectedStore = store; // or undefined

module.exports = controller(injectedStore);