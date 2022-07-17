/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');

const errorHandler = (error, _req, res, _next) => {
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
};

module.exports = errorHandler;
