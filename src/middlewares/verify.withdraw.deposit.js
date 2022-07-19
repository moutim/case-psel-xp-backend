const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const withdrawSchema = Joi.object({
  value: Joi.number().min(50).max(100000).required(),
});

const verifyWithdrawDeposit = (req, res, next) => {
  const { error } = withdrawSchema.validate(req.body);
  if (error) throw Object({ status: StatusCodes.UNPROCESSABLE_ENTITY, message: error.message });

  next();
};

module.exports = verifyWithdrawDeposit;
