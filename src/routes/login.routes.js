const express = require('express');

const routes = express.Router();

const controller = require('../controllers/login.controller');

const middlewares = require('../middlewares');

routes.post('/', middlewares.validateLogin, controller.login);

module.exports = routes;
