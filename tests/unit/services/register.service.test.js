const { describe, afterEach, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const { customer, customerTransaction } = require('../../../src/database/models');
const mocks = require('../mocks/register.mock');
const mocksCustomer = require('../mocks/customer.mock');
const service = require('../../../src/services/register.service');
const jwt = require('../../../src/utils/JWT');

describe('Verifica os retornos da função newRegister na camada de SERVICE', () => {
  describe('Quando o registro é concluido com sucesso', () => {
    afterEach(() => {
      customer.findOne.restore();
      customer.create.restore();
      customerTransaction.create.restore();
    });

    it('Retorna um objeto com o token de autorização', async () => {
      sinon.stub(customer, 'findOne').resolves(false);
      sinon.stub(customer, 'create').resolves({ dataValues: mocksCustomer.resultGetCustomerInfos });
      sinon.stub(customerTransaction, 'create').resolves(true);
      sinon.stub(jwt, 'generateToken').returns(mocks.resultNewRegister.token);

      const inputRegister = {
        firstName: 'nome',
        lastName: 'sobrenome',
        email: 'email@email.com',
        password: 'password',
      };

      const result = await service.newRegister(inputRegister);

      expect(result).to.be.deep.equal(mocks.resultNewRegister);
    });
  });

  describe('Quando o registro NÃO é concluido com sucesso', () => {
    afterEach(() => {
      customer.findOne.restore();
      customer.create.restore();
      customerTransaction.create.restore();
    });

    it('Retorna um erro com a mensagem "There was an error completing the registration"', async () => {
      sinon.stub(customer, 'findOne').resolves(false);
      sinon.stub(customer, 'create').resolves({ dataValues: mocksCustomer.resultGetCustomerInfos });
      sinon.stub(customerTransaction, 'create').resolves(false);

      const inputRegister = {
        firstName: 'nome',
        lastName: 'sobrenome',
        email: 'email@email.com',
        password: 'password',
      };

      try {
        await service.newRegister(inputRegister);
      } catch (error) {
        expect(error).to.be.deep.equal(mocks.registrationError);
      }
    });
  });

  describe('Quando o email já está cadastrado', () => {
    afterEach(() => {
      customer.findOne.restore();
    });

    it('Retorna um erro com a mensagem "There was an error completing the registration"', async () => {
      sinon.stub(customer, 'findOne').resolves(true);

      const inputRegister = {
        firstName: 'nome',
        lastName: 'sobrenome',
        email: 'email@email.com',
        password: 'password',
      };

      try {
        await service.newRegister(inputRegister);
      } catch (error) {
        expect(error).to.be.deep.equal(mocks.emailAlreadyRegistered);
      }
    });
  });
});
