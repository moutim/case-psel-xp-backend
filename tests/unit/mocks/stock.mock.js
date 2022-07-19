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

module.exports = {
  stocks,
  stocksNotFound,
};
