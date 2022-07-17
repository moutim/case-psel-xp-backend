const { StatusCodes } = require('http-status-codes');

const service = require('../services/login.service');

const login = async (req, res) => {
  const loginResult = await service.login(req.body);

  res.status(StatusCodes.OK).json(loginResult);
};

module.exports = {
  login,
};
