const resultLogin = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxLCJpYXQiOjE2NTgwMzQ4ODcsImV4cCI6MTY1ODA2MzY4N30.Yl63GEqGPL5QKxEiM_9yP_U2KB2gBR3yShMBSC0orfo',
};

const returnFindOne = {
  dataValues: {
    customerId: 1,
    firstName: 'Vitor',
    lastName: 'Moutim',
    email: 'moutimg@gmail.com',
    password: 'password',
    balance: '150',
  },
};

const emailNotFound = { status: 404, message: 'Email not found' };

const incorrectPassword = { status: 401, message: 'Incorrect password' };

module.exports = {
  resultLogin,
  returnFindOne,
  emailNotFound,
  incorrectPassword,
};
