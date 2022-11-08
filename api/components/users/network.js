const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index.js');
const secure = require('./secure');

router.get('/', list);
router.get('/:id', get);
router.put('/', secure('update'), set);
router.post('/', insert);
router.post('/follow/:id', secure('follow'), follow);
router.post('/following/:id', secure('following'), following);
router.delete('/', remove);

async function list(req, res, next){
    try {
        const usersList = await controller.list();
        response.success(req, res, usersList, 200);
    } catch (error) {
        next(error)
        // console.log(error)
        // response.error(req, res, error, 500);
    }
};

async function get(req, res, next){
    const { id } = req.params;
    try {
        if(!id) throw "Id not found.";
        const user = await controller.get(id);
        response.success(req, res, user, 200);
    } catch (error) {
        next(error)
        // console.log(error)
        // response.error(req, res, error, 500);
    }
};

async function set(req, res, next){
    const { id, name, userName, password } = req.body;
    try {
        if(!id) throw "Id not found.";
        const user = await controller.set(id, name, userName, password);
        response.success(req, res, user, 200);
    } catch (error) {
        next(error)
        // console.log(error);
        // response.error(req, res, error, 500);
    }
};

async function insert (req, res, next){
    const { name, userName, password } = req.body;
    try {
        if(!name) throw "data invalid.";
        const user = await controller.insert(name, userName, password);
        response.success(req, res, user, 200);
    } catch (error) {
        next(error)
        // console.log(error)
        // response.error(req, res, error, 500);
    }
};

async function follow (req, res, next){
    const { id } = req.params;
    try {
        if(!id) throw "data invalid.";
        const follow = await controller.follow(req.user.id, id);
        response.success(req, res, follow, 200);
    } catch (error) {
        next(error)
        // console.log(error)
        // response.error(req, res, error, 500);
    }
};


async function following (req, res, next){
    const { id } = req.params;
    try {
        if(!id) throw "data invalid.";
        const follow = await controller.following(id);
        response.success(req, res, follow, 200);
    } catch (error) {
        next(error)
        // console.log(error)
        // response.error(req, res, error, 500);
    }
};

async function remove(req, res, next){
    const { id } = req.params;
    try {
        if(!id) throw "Id not found.";
        const user = await controller.remove(id);
        response.success(req, res, user, 200);
    } catch (error) {
        next(error)
        // response.error(req, res, error, 500);
    }
};



module.exports = router;