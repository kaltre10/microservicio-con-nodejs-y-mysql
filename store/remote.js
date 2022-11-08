const request = require('request');

function createRemoteDB( host, post){
   
    const URL = 'http://' + host + ':' + post;
    function list(table){
        return req('GET', table);
    }
    // function get(table, id){}
    // function upsert(table, data){}
    // function query(table, query, join){}

    function req(method, table, data){
        let url = URL + '/' + table;
        let body = '';
        
        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, (err, req, body) => {
                if(err){
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message);
                }
                const result = JSON.parse(body);
               
                return resolve(result.body);
            })
        })
    }

    return {
        list
    }
}

module.exports = createRemoteDB;