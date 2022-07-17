const resultGetCustomerInfos = {
  customerId: 1,
  firstName: 'Vitor',
  lastName: 'Moutim',
  email: 'moutimg@gmail.com',
  balance: '150',
};

const customerNotFound = { status: 404, message: 'Customer with id 1 not found' };

module.exports = {
  resultGetCustomerInfos,
  customerNotFound,
};
