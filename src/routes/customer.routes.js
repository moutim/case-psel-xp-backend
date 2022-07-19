const express = require('express');

const routes = express.Router();

const controller = require('../controllers/customer.controller');

const middlewares = require('../middlewares');

routes.get('/infos', controller.getCustomerInfos);

routes.put('/update', middlewares.verifyUpdateCustomer, controller.updateCustomerInfos);

routes.post('/withdraw', middlewares.verifyWithdraw, controller.withdraw);

module.exports = routes;
