const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
    host: config.mysql.HOST,
    user: config.mysql.USER,
    password: config.mysql.PASSWORD,
    database: config.mysql.DATABASE,
}

let connection;

const handleConnect = () => {
    connection = mysql.createConnection(dbConfig);
    connection.connect(err => {
        if(err) {   
            console.error('[db error]', err);
            setTimeout(() => handleConnect, 2000);
        }else{
            console.log('DB connection established');
        }
        
    });
    connection.on('error', err => {
        console.error('[db error]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnect();
        }else{
            throw err;
        }
    });
}

const list = (tabla) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla}`, (err, data) => {
            if(err) reject(err)
            resolve(data);
        })
    });
}

const get = (tabla, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (err, data) => {
            if(err) reject(err)
            resolve(data);
        })
    });
}

const set = (tabla, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${tabla} SET ? WHERE id=?`, [data, data.id], (err, data) => {
            if(err) reject(err)
            resolve(data);
        })
    });
}


const insert = (tabla, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${tabla} SET ?`, data, (err, data) => {
            if(err) reject(err)
            resolve(data);
        })
    });
}

const query = (tabla, query, join) => {
   
    let joinQuery = '';
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${tabla}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} ${joinQuery} WHERE ? `, query, (err, result) => {
            if(err) reject(err)
            resolve(result || null);
        })
    });
}

handleConnect();

module.exports = {
    list,
    get,
    set,
    insert,
    query
}