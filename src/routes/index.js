const express = require('express');

const routes = express.Router();

const middlewares = require('../middlewares');

routes.use('/login', require('./login.routes'));

routes.use('/customer', middlewares.authenticateToken, require('./customer.routes'));

module.exports = routes;
