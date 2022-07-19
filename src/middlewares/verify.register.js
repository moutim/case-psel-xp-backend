const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } }).required(),
  password: Joi.string().min(5).required(),
});

const verifyRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) throw Object({ status: StatusCodes.UNPROCESSABLE_ENTITY, message: error.message });

  next();
};

module.exports = verifyRegister;
