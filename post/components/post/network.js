const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index.js');
const secure = require('./secure');

router.get('/', listPost);
router.get('/:idPost', getPostId);
router.put('/', secure('logget'), updatePost);

async function listPost(req, res, next){
    try {
        const list = await controller.list();
        response.success(req, res, list, 200);
    } catch (error) {
        next(error)
    }
}

async function getPostId(req, res, next){
    const { idPost } = req.params;
    try {
        if(!idPost) throw 'Data Invalid!';
        const list = await controller.getPostId(idPost);
        response.success(req, res, list, 200);
    } catch (error) {
        next(error)
    }
}

async function updatePost(req, res, next){
    const {description, idPost} = req.body;
    try {
        if(!description, !idPost) throw 'Data Invalid!';
        const list = await controller.update(description, idPost, req.user.id);
        response.success(req, res, list, 200);
    } catch (error) {
        next(error)
    }
}

module.exports = router