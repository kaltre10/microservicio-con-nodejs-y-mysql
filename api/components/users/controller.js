const auth = require('../auth');
const TABLA = 'users';
const bcrypt = require('bcrypt');
// const { v4: uuidv4 } = require('uuid');

module.exports = (injectedStore = require('../../../store/mysql'), injectedCache = require('../../../store/redis')) => {
    const list = async () => {
        let users = await injectedCache.list(TABLA); 
        if(!users) {
            console.log('No en cache, desde DB');
            users = await injectedStore.list(TABLA);
            await injectedCache.set(TABLA, users); 
        }else{
            console.log('Desde Cache!!!');
        }
        return users;
    }

    const get = (id) => {
        return injectedStore.get(TABLA, id);
    }

    const set = async (id, name, userName, password) => {
        const pasHash = await bcrypt.hash(String(password), 5);
        const data = { id, userName, password: pasHash }
        const user = await get(id);
        if(user.length === 0) return [];
        if(userName || password) injectedStore.set("auth", data);
        const userUpdate = { id, name, userName }
        const newUser = await injectedStore.set(TABLA, userUpdate);
        return newUser;
    }

    const insert = async (name, userName, password) => {
        // const users = await list();
        // let newId = id || uuidv4();
        let data = { name, userName };
        let user = await injectedStore.insert(TABLA, data);
        if(userName || password) {
            await auth.insert({ id: user.insertId, userName, password});
        }
        return data;
    }

    const follow = async (user_from, user_to) => {
        // const users = await list();
        // let newId = id || uuidv4();
        let data = { user_from, user_to };
        let follow = await injectedStore.insert(`${TABLA}_follow`, data);
        return follow;
    }

    const following = async (user) => {
        const join = {}
        join[TABLA] = "user_to"; // { user: user_to}
        const query = { user_from: user };
        return await injectedStore.query(`${TABLA}_follow`, query, join)
    }

    const remove = async (id) => {
        return injectedStore.remove(TABLA, id);
    }

    return {
        list,
        get,
        insert,
        follow,
        following,
        remove,
        set
    }
}