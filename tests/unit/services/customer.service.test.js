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
