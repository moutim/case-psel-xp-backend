const resultGetCustomerInfos = {
  customerId: 1,
  firstName: 'Vitor',
  lastName: 'Moutim',
  email: 'moutimg@gmail.com',
  balance: 150,
};

const customerNotFound = { status: 404, message: 'Customer with id 1 not found' };

const informationUpdated = { message: 'Information updated successfully' };

const informationNotUpdated = { status: 500, message: 'There was an error updating the information' };

const withdrawSuccessful = { message: 'Withdrawal successful' };

const withdrawError = { status: 500, message: 'An error occurred while performing the transaction' };

const insufficientBalance = { status: 401, message: 'Insufficient balance for this transaction' };

module.exports = {
  resultGetCustomerInfos,
  customerNotFound,
  informationUpdated,
  informationNotUpdated,
  withdrawSuccessful,
  withdrawError,
  insufficientBalance,
};
