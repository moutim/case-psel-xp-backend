const { StatusCodes } = require('http-status-codes');
const service = require('../services/register.service');

const newRegister = async (req, res) => {
  const result = await service.newRegister(req.body);

  res.status(StatusCodes.CREATED).json(result);
};

module.exports = {
  newRegister,
};
