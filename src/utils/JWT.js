const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const jwtConfig = {
  expiresIn: '8h',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = (token) => {
  const result = jwt.verify(token, SECRET, jwtConfig);

  if (result) return result;

  throw Object({ status: StatusCodes.UNAUTHORIZED, message: 'Invalid token' });
};

module.exports = {
  generateToken,
  authenticateToken,
};
