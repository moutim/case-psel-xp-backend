const stocks = [
  {
    stockId: 1,
    name: 'PETR4',
    value: 26.95,
    quantity: 300,
    company: {
      companyId: 1,
      name: 'BR Petrobras',
    },
  },
  {
    stockId: 2,
    name: 'VALE3',
    value: 75.27,
    quantity: 200,
    company: {
      companyId: 2,
      name: 'VALE',
    },
  },
];

const stocksNotFound = { status: 404, message: 'There are no stocks available at the moment' };

const stockNotFound = { status: 404, message: 'Stock with id 1 not found' };

const buyMade = {
  message: 'Successful purchase',
  transactionId: 10,
};

const insufficientStocks = { status: 401, message: 'There are not enough stocks to make the purchase' };

const insufficientBalance = { status: 401, message: 'Insufficient balance for this transaction' };

const customerStockWallet = { quantity: 10, value: 100 };

const transactionError = { status: 500, message: 'An error occurred while performing the transaction' };

module.exports = {
  stocks,
  stocksNotFound,
  buyMade,
  stockNotFound,
  insufficientStocks,
  insufficientBalance,
  customerStockWallet,
  transactionError,
};
