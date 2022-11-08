const express =  require('express');
const config = require('../config');
const route = require('./network');
const app = express();

app.use(express.json());

//ROUTES
app.use('/', route);

app.listen( config.MysqlServices.PORT, () => console.log('mysql listening on', config.MysqlServices.PORT) )