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

const depositMadeSuccessfully = { message: 'Deposit made successfully' };

const transactionError = { status: 500, message: 'An error occurred while performing the transaction' };

const insufficientBalance = { status: 401, message: 'Insufficient balance for this transaction' };

const customerDeleted = { message: 'User successfully deleted' };

const customerNotDeleted = { status: 400, message: 'There was an error deleting the user' };

const customerTransactions = [
  {
    transactionId: 1,
    customerId: 1,
    value: 60,
    date: '2022-07-19T05:19:40.000Z',
    type: {
      type: 'saque',
    },
  },
  {
    transactionId: 2,
    customerId: 1,
    value: 70,
    date: '2022-07-19T05:19:40.000Z',
    type: {
      type: 'deposito',
    },
  },
];

const transactionsNotFound = { status: 404, message: "You don't have transactions yet" };

module.exports = {
  resultGetCustomerInfos,
  customerNotFound,
  informationUpdated,
  informationNotUpdated,
  withdrawSuccessful,
  transactionError,
  insufficientBalance,
  depositMadeSuccessfully,
  customerDeleted,
  customerNotDeleted,
  customerTransactions,
  transactionsNotFound,
};
