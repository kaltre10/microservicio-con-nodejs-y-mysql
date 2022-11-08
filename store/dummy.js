const db = {
    users: [
        {id: 1, name: 'John'}
    ]
}

const list = async (tabla) => {
    return db[tabla] || [];
}

const get = async (tabla, id) => {
    return db[tabla].filter( item => item.id === id )[0] || []
}

const set = async (tabla, data) => {
    db[tabla].filter(item => {
        if(item.id === data.id){
            item.name = data.name;
            item.userName = data.userName;
            item.password = data.password;
            return item;
        };
        
        return item;
    });
    // console.log(newTabla)
    // db[tabla] = newTabla;
    // return db[tabla].filter( item => user.id === data.id )[0] || []
    return db[tabla];
}

const insert = async (tabla, data) => {
    if(!db[tabla]) db[tabla] = [];
    db[tabla].push( data );
    return data;
}

const remove = async (tabla, id) => {
    db[tabla] = db[tabla].filter( item => item.id !== Number(id) );
    return true;
}

const query = async (tabla, data) => {
    return db[tabla].filter( item => item[Object.keys(data)[0]] === data[Object.keys(data)[0]])[0]
}

module.exports = {
    list,
    set,
    get,
    insert,
    remove,
    query
}