const { sign } = require('../../../auth');
const bcrypt = require('bcrypt');
const error = require('../../../utils/error');
const TABLA = 'auth'

module.exports = (injectedStore = require("../../../store/dummy")) => {

    const store = injectedStore;

    const insert = async (data) => {
        const authData = {}
        authData.id = data.id;
        authData.userName = data.userName;
        authData.password = await bcrypt.hash(String(data.password), 5);
        return store.insert(TABLA, authData);
    }

    const login = async (userName, password) => {
            const [user] = await store.query(TABLA, {userName: userName});
            if(!user) throw error("User not found", 401); 
            const pass = String(password);
            const hashPass = String(user['password'])
            const passVerify = await bcrypt.compare(pass, hashPass);
            if(!passVerify) throw error("Data Invalid", 401);
            //add token
            return { token: sign(user)};
    }

    return {
        insert,
        login
    }
}