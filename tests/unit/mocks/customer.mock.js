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

const withdrawSuccessful = {
  message: 'Withdrawal successful',
  transactionId: 1,
  customerId: 1,
  value: 50,
};

const depositMadeSuccessfully = {
  message: 'Deposit made successfully',
  transactionId: 1,
  customerId: 1,
  value: 50,
};

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

const customerStocks = {
  stocksWallet: [
    {
      stockId: 1,
      name: 'PETR4',
      quantity: 10,
      companyName: 'BR Petrobras',
      date: '2022-07-19T18:56:19.000Z',
    },
  ],
  stocksTransactions: [
    {
      transactionId: 1,
      name: 'PETR4',
      quantity: 10,
      value: 269.5,
      companyName: 'BR Petrobras',
      type: 'compra',
      date: '2022-07-19T18:56:19.000Z',
    },
  ],
};

const stocksErrors = {
  stocksWallet: [{ message: "You don't have any stocks in your wallet" }],
  stocksTransactions: [{ message: "'You have not executed any stock transactions yet'" }],
};

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
  customerStocks,
  stocksErrors,
};
