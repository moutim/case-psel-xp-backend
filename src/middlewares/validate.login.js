const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } }).required(),
  password: Joi.string().min(5).required(),
});

const validateLogin = (req, _res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) throw Object({ status: StatusCodes.UNPROCESSABLE_ENTITY, message: error.message });

  next();
};

module.exports = validateLogin;
