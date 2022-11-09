const express = require('express');
const config = require('../config');
const route = require('./network');
const app = express();

app.use(express.json());
app.use('/', route);

app.listen(config.cacheServices.PORT, () => console.log(`listening on ${config.cacheServices.PORT}`));