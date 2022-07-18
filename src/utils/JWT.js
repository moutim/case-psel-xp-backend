const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '8h',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, process.env.SECRET, jwtConfig);

const authenticateToken = (token) => {
  if (!token) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: '"Token" is required' });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET, jwtConfig);
    return payload;
  } catch (e) {
    throw Object({ status: StatusCodes.UNAUTHORIZED, message: 'Invalid or expired token' });
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};
