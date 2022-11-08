const express = require('express');
const response = require('../../../network/response');
const controller = require('../auth');
const route = express.Router();

route.post('/', login);

async function login(req, res, next){
    const { userName, password } = req.body;
    try {
        if(!userName || !password) throw "Data Invalid!";
        const login = await controller.login(userName, password);
        response.success(req, res, login, 200);
    } catch (error) {
        // console.log(error)
        next(error)
        // response.error(req, res, error, 400);
    }
}

module.exports = route;