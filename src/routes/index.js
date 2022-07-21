const express = require('express');

const routes = express.Router();

const middlewares = require('../middlewares');

routes.use('/login', require('./login.routes'));

routes.use('/register', require('./register.routes'));

routes.use('/customer', middlewares.authenticateToken, require('./customer.routes'));

routes.use('/stocks', middlewares.authenticateToken, require('./stock.routes'));

module.exports = routes;
