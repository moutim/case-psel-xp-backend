const resultNewRegister = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjozLCJpYXQiOjE2NTgyMDAxOTcsImV4cCI6MTY1ODIyODk5N30.KnEI0nsozojayLgdArDd-tN30aTQJBeTfQ1V0rseHgY',
};

const registrationError = { status: 500, message: 'There was an error completing the registration' };

const emailAlreadyRegistered = { status: 400, message: 'Email already registered' };

module.exports = {
  resultNewRegister,
  registrationError,
  emailAlreadyRegistered,
};
