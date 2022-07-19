const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const updateCustomerSchema = Joi.object({
  firstName: Joi.string().min(3).max(15),
  lastName: Joi.string().min(3).max(15),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } }).required(),
  password: Joi.string().min(5),
});

const verifyUpdateCustomer = (req, res, next) => {
  const { error } = updateCustomerSchema.validate(req.body);
  if (error) throw Object({ status: StatusCodes.UNPROCESSABLE_ENTITY, message: error.message });

  next();
};

module.exports = verifyUpdateCustomer;
