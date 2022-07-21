const express = require('express');

const routes = express.Router();

const controller = require('../controllers/customer.controller');

const middlewares = require('../middlewares');

routes.get('/infos', controller.getCustomerInfos);

routes.put('/update', middlewares.verifyUpdateCustomer, controller.updateCustomerInfos);

routes.post('/withdraw', middlewares.verifyWithdrawDeposit, controller.withdraw);

routes.post('/deposit', middlewares.verifyWithdrawDeposit, controller.deposit);

routes.delete('/delete', controller.deleteCustomer);

routes.get('/transactions', controller.getCustomerTransactions);

routes.get('/stocks', controller.getCustomerStocks);

module.exports = routes;
