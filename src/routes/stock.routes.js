const express = require('express');

const routes = express.Router();

const controller = require('../controllers/stock.controller');

routes.get('/', controller.getStocks);

module.exports = routes;
