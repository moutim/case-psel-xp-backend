const express = require('express');

const routes = express.Router();

const controller = require('../controllers/stock.controller');

routes.get('/', controller.getStocks);

routes.post('/buy', controller.buyStocks);

module.exports = routes;
