const { describe, afterEach, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const { customer } = require('../../../src/database/models');
const mocks = require('../mocks/login.mock');
const service = require('../../../src/services/login.service');
const bcrypt = require('../../../src/utils/bcrypt');
const jwt = require('../../../src/utils/JWT');
chai.use(require('chai-as-promised'));

describe('Verifica os retornos da função login na camada de SERVICE', () => {
  describe('Quando encontra o cliente no banco', () => {
    afterEach(() => {
      customer.findOne.restore();
      bcrypt.comparePassword.restore();
      jwt.generateToken.restore();
    });

    it('Retorna um objeto com o token de autorização', async () => {
      sinon.stub(customer, 'findOne').resolves(mocks.returnFindOne);
      sinon.stub(bcrypt, 'comparePassword').returns(true);
      sinon.stub(jwt, 'generateToken').returns(mocks.resultLogin.token);

      const result = await service.login({ email: 'testes@testes.com', password: 'testes' });

      expect(result).to.be.deep.equal(mocks.resultLogin);
    });
  });

  describe('Quando não encontra o cliente no banco', () => {
    afterEach(() => {
      customer.findOne.restore();
    });

    it('Retorna um erro com "Email not found"', () => {
      sinon.stub(customer, 'findOne').resolves();

      expect(service.login({ email: 'testes@testes.com', password: 'testes' })).to.be
        .rejectedWith('Email not found');
    });
  });

  describe('Quando as senhas não são iguais', () => {
    afterEach(() => {
      customer.findOne.restore();
    });

    it('Retorna um erro com "Email not found"', async () => {
      sinon.stub(customer, 'findOne').resolves(mocks.returnFindOne);
      sinon.stub(bcrypt, 'comparePassword').returns(false);

      expect(service.login({ email: 'testes@testes.com', password: 'testes' })).to.be
        .rejectedWith('Incorrect password');
    });
  });
});
