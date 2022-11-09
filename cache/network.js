const express = require('express');
const route = express.Router();
const store = require('../store/redis');
const response = require('../network/response');

route.get('/:table', list);
route.get('/:table/:id', get);
route.put('/:table/', update);

async function list(req, res, next) {
    const data = await store.list(req.params.table);
    response.success(req, res, data, 200);
}

async function get(req, res, next) {
    const data = await store.get(req.params.table, req.params.id);
    response.success(req, res, data, 200);
}

async function update(req, res, next) {
    const data = await store.upsert(req.params.table, req.body);
    response.success(req, res, data, 200);
}

module.exports = route;