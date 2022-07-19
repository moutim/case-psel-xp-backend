const express = require('express');

const routes = express.Router();

const controller = require('../controllers/register.controller');

const middlewares = require('../middlewares');

routes.post('/', middlewares.verifyRegister, controller.newRegister);
// routes.post('/', (req, res) => {
//   res.status(200).json({ message: 'PASSSO' });
// });

module.exports = routes;
