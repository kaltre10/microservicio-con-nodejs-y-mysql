const TABLA = 'post';
const error = require('../../../utils/error');

module.exports = (injectedStore = require('../../../store/dummy')) => {

    const list = () => {
        return injectedStore.list(TABLA);
    }

    const getPostId = (id) => {
        return injectedStore.get(TABLA, id);
    }

    const update = async (description, idPost, idUser) => {
        const [post] = await getPostId(idPost);
        if( post['user'] !== idUser ) throw error('Not authorized!', 401);
        const newData = {description, id: idPost};
        return await injectedStore.set(TABLA, newData);
    }

    return {
        list,
        update,
        getPostId
    }

}