const express = require('express');
const config = require('../config');
const post = require('./components/post/network');
const app = express();
const errors = require('../network/errors');

app.use(express.json());
app.use('/api/post', post);
app.use(errors);

app.listen(config.post.PORT, () => console.log(`listening Post on  ${config.post.PORT}`));