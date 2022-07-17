const express = require('express');

const routes = express.Router();

routes.use('/login', require('./login.routes'));

module.exports = routes;
