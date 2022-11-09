// const store = require('../../../store/mysql');

const config = require('../../../config');
let store;
let cache;
if(config.remoteDB === true) {
    store = require('../../../store/remote-mysql');
    cache = require('../../../store/remote-cache');
    console.log("remote", store, cache)
}else{
    store = require('../../../store/mysql');
    cache = require('../../../store/redis');
}

const controller = require('./controller');

const injectedStore = store; // or undefined
const injectedCache = cache; // or undefined



module.exports = controller(injectedStore, injectedCache);