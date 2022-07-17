const bcrypt = require('bcrypt');

const saltRounds = bcrypt.genSaltSync(5);

const encodePassword = (password) => bcrypt.hashSync(password, saltRounds);

const comparePassword = (inputPWD, dbPWD) => bcrypt.compareSync(inputPWD, dbPWD);

module.exports = {
  encodePassword,
  comparePassword,
};
