const { StatusCodes } = require('http-status-codes');

const errorHandler = (error, req, res) => {
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
};

module.exports = errorHandler;
