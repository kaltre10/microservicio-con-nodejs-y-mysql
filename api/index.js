const express = require('express');
const config = require('../config');
const users = require('./components/users/network');
const auth = require('./components/auth/network');
const app = express();
const errors = require('../network/errors');

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(errors);

app.listen(config.api.PORT, () => console.log(`listening on ${config.api.PORT}`));