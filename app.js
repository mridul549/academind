const express = require('express');
const app = express();

app.use('/', require('./api/routes/home'));

module.exports = app;