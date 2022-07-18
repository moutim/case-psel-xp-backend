const { describe, afterEach, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const { customer } = require('../../../src/database/models');
const mocks = require('../mocks/customer.mock');
const service = require('../../../src/services/customer.service');

describe('Verifica os retornos da função getCustomerInfos na camada de SERVICE', () => {
  describe('Quando encontra o cliente no banco', () => {
    afterEach(() => {
      customer.findOne.restore();
    });

    it('Retorna um objeto com as informações do cliente', async () => {
      sinon.stub(customer, 'findOne').resolves(mocks.resultGetCustomerInfos);

      const result = await service.getCustomerInfos(1);

      expect(result).to.be.deep.equal(mocks.resultGetCustomerInfos);
    });
  });

  describe('Quando não encontra o cliente no banco', () => {
    afterEach(() => {
      customer.findOne.restore();
    });

    it('Retorna um erro com "Customer with id 1 not found"', async () => {
      sinon.stub(customer, 'findOne').resolves(false);

      try {
        await service.getCustomerInfos(1);
      } catch (error) {
        expect(error).to.be.deep.equal(mocks.customerNotFound);
      }
    });
  });
});

describe.only('Verifica os retornos da função updateCustomerInfos na camada de SERVICE', () => {
  describe('Quando as informações são atualizadas', () => {
    afterEach(() => {
      customer.update.restore();
    });

    it('Retorna um objeto com a mensagem "Information updated successfully"', async () => {
      sinon.stub(customer, 'update').resolves([true]);

      const result = await service.updateCustomerInfos(1, { password: 'newPassword' });

      expect(result).to.be.deep.equal(mocks.informationUpdated);
    });
  });

  describe('Quando as informações NÃO são atualizadas', () => {
    afterEach(() => {
      customer.update.restore();
    });

    it('Retorna um erro com a mensagem "There was an error updating the information"', async () => {
      sinon.stub(customer, 'update').resolves(false);

      try {
        await service.updateCustomerInfos(1, { password: 'newPassword' });
      } catch (error) {
        expect(error).to.be.deep.equal(mocks.informationNotUpdated);
      }
    });
  });
});
