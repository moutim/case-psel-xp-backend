const { describe, afterEach, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const { customer, customerTransaction } = require('../../../src/database/models');
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

describe('Verifica os retornos da função updateCustomerInfos na camada de SERVICE', () => {
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

describe('Verifica os retornos da função withdraw na camada de SERVICE', () => {
  describe('Quando o valor do saque é maior que o balance do cliente', () => {
    afterEach(() => {
      customer.findOne.restore();
    });

    it('Retorna um objeto com a mensagem "Information updated successfully"', async () => {
      sinon.stub(customer, 'findOne').resolves({ dataValues: { ...mocks.resultGetCustomerInfos } });

      try {
        await service.withdraw(1, 200);
      } catch (error) {
        expect(error).to.deep.equal(mocks.insufficientBalance);
      }
    });
  });

  describe('Quando o saque é realizado com sucesso', () => {
    afterEach(() => {
      customer.findOne.restore();
      customer.update.restore();
      customerTransaction.create.restore();
    });

    it('Retorna um objeto com a mensagem "Information updated successfully"', async () => {
      sinon.stub(customer, 'findOne').resolves({ dataValues: { ...mocks.resultGetCustomerInfos } });
      sinon.stub(customer, 'update').resolves(true);
      sinon.stub(customerTransaction, 'create').resolves(true);

      const result = await service.withdraw(1, 50);

      expect(result).to.be.deep.equal(mocks.withdrawSuccessful);
    });
  });

  describe('Quando o saque NÃO é realizado com sucesso', () => {
    afterEach(() => {
      customer.findOne.restore();
      customer.update.restore();
      customerTransaction.create.restore();
    });

    it('Retorna um erro com a mensagem "An error occurred while performing the transaction"', async () => {
      sinon.stub(customer, 'findOne').resolves({ dataValues: { ...mocks.resultGetCustomerInfos } });
      sinon.stub(customer, 'update').resolves(false);
      sinon.stub(customerTransaction, 'create').resolves(false);

      try {
        await service.withdraw(1, 50);
      } catch (error) {
        expect(error).to.deep.equal(mocks.withdrawError);
      }
    });
  });
});
