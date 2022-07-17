const express = require('express');

const routes = express.Router();

const controller = require('../controllers/customer.controller');

routes.get('/', controller.getCustomerInfos);

module.exports = routes;
