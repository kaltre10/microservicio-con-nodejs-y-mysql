const express = require('express');
const route = express.Router();
const store = require('../store/mysql');
const response = require('../network/response');

route.get('/:table', list);
route.get('/:table/:id', get);
route.post('/:table/', insert);
route.put('/:table/', update);
route.post('/query/:table/', query);

async function list(req, res, next) {
    const data = await store.list(req.params.table);
    response.success(req, res, data, 200);
}

async function get(req, res, next) {
    const data = await store.get(req.params.table, req.params.id);
    response.success(req, res, data, 200);
}

async function insert(req, res, next) {
    const data = await store.get(req.params.table, req.body.data);
    response.success(req, res, data, 200);
}

async function update(req, res, next) {
    const data = await store.set(req.params.table, req.body.data);
    response.success(req, res, data, 200);
}

async function query(req, res, next) {
    const data = await store.query(req.params.table, req.body.query, req.body.join);
    response.success(req, res, data, 200);
}

module.exports = route;