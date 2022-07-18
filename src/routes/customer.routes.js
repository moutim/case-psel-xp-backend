const express = require('express');

const routes = express.Router();

const controller = require('../controllers/customer.controller');

const middlewares = require('../middlewares');

routes.get('/infos', controller.getCustomerInfos);

routes.post('/update', middlewares.verifyUpdateCustomer, controller.updateCustomerInfos);

module.exports = routes;
