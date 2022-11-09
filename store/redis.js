const redis = require('redis');
const config = require('../config');

const client = redis.createClient({
    url: config.redis.CONNECT
  });

async function list(table){
    return new Promise( async (resolve, reject) => {
        try {
            await client.connect();
            const value = await client.get(table);
            await client.disconnect();
            return resolve(JSON.parse(value));
        } catch (error) {
            console.log('Redis Client Error', error);
            await client.disconnect();
            reject(error)
        }
    })
    // client.on('error', (err) => console.log('Redis Client Error', err));

    // await client.connect();
    // await client.set('key', 'value');
    // const value = await client.get(table);
    // await client.disconnect();
    // return value;
}

function get(table, id){

}

async function set(table, data){
    await client.connect();
    let key = table;
    if(data && data?.id){
        key = `${key}_${data.id}`;
    }
    await client.set(key, JSON.stringify(data), {
        EX: 10,
      });
    await client.disconnect();
    return true;
}

module.exports = {
    list,
    get, 
    set
}