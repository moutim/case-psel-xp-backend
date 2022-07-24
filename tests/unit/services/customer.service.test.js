const {
  describe, afterEach, it,
} = require('mocha');
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

    it('Retorna um objeto com a mensagem "Insufficient balance"', async () => {
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

    it('Retorna um objeto com a mensagem "Withdrawal successful"', async () => {
      sinon.stub(customer, 'findOne').resolves({ dataValues: { ...mocks.resultGetCustomerInfos } });
      sinon.stub(customer, 'update').resolves(true);
      sinon.stub(customerTransaction, 'create').resolves({ dataValues: { transactionId: 1 } });

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
        expect(error).to.deep.equal(mocks.transactionError);
      }
    });
  });
});

describe('Verifica os retornos da função deposit na camada de SERVICE', () => {
  describe('Quando o deposito é realizado com sucesso', () => {
    afterEach(() => {
      customer.findOne.restore();
      customer.update.restore();
      customerTransaction.create.restore();
    });

    it('Retorna um objeto com a mensagem "Deposit made successfully"', async () => {
      sinon.stub(customer, 'findOne').resolves({ dataValues: { ...mocks.resultGetCustomerInfos } });
      sinon.stub(customer, 'update').resolves(true);
      sinon.stub(customerTransaction, 'create').resolves({ dataValues: { transactionId: 1 } });

      const result = await service.deposit(1, 50);

      expect(result).to.be.deep.equal(mocks.depositMadeSuccessfully);
    });
  });

  describe('Quando o deposito NÃO é realizado com sucesso', () => {
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
        await service.deposit(1, 50);
      } catch (error) {
        expect(error).to.deep.equal(mocks.transactionError);
      }
    });
  });
});

describe('Verifica os retornos da função deleteCustomer na camada de SERVICE', () => {
  describe('Quando o cliente é deletado com sucesso', () => {
    afterEach(() => {
      customer.destroy.restore();
    });

    it('Retorna um objeto com a mensagem "User successfully deleted"', async () => {
      sinon.stub(customer, 'destroy').resolves(true);

      const result = await service.deleteCustomer(1);

      expect(result).to.be.deep.equal(mocks.customerDeleted);
    });
  });

  describe('Quando o cliente NÃO é deletado com sucesso', () => {
    afterEach(() => {
      customer.destroy.restore();
    });

    it('Retorna um erro com a mensagem "There was an error deleting the user"', async () => {
      sinon.stub(customer, 'destroy').resolves(false);

      try {
        await service.deleteCustomer(1);
      } catch (error) {
        expect(error).to.deep.equal(mocks.customerNotDeleted);
      }
    });
  });
});

describe('Verifica os retornos da função getCustomerTransactions na camada de SERVICE', () => {
  describe('Quando as transações são encontradas', () => {
    afterEach(() => {
      customerTransaction.findAll.restore();
    });

    it('Retorna um array de objetos com as transações', async () => {
      sinon.stub(customerTransaction, 'findAll').resolves(mocks.customerTransactions);

      const result = await service.getCustomerTransactions(1);

      expect(result).to.be.deep.equal(mocks.customerTransactions);
    });
  });

  describe('Quando as transações NÃO são encontradas', () => {
    afterEach(() => {
      customerTransaction.findAll.restore();
    });

    it('Retorna um erro com a mensagem "There was an error deleting the user"', async () => {
      sinon.stub(customerTransaction, 'findAll').resolves([]);

      try {
        await service.getCustomerTransactions(1);
      } catch (error) {
        expect(error).to.deep.equal(mocks.transactionsNotFound);
      }
    });
  });
});

describe('Verifica os retornos da função getCustomerStocks na camada de SERVICE', () => {
  describe('Quando a carteira e as transações de ações são encotradas', () => {
    it('Retorna um objeto com stocksWallet e stocksTransactions', async () => {
      const result = await service.getCustomerStocks(1);

      expect(result).to.be.an('object');
      expect(result).to.have.property('stocksWallet');
      expect(result).to.have.property('stocksTransactions');
    });

    it('A chave stocksWallet deve ser um array de objetos', async () => {
      const result = await service.getCustomerStocks(1);

      expect(result.stocksWallet).to.be.an('array');
      expect(result.stocksWallet[0]).to.be.an('object');
      expect(result.stocksWallet[0]).to.have.property('stockId');
      expect(result.stocksWallet[0]).to.have.property('name');
      expect(result.stocksWallet[0]).to.have.property('quantity');
      expect(result.stocksWallet[0]).to.have.property('companyName');
      expect(result.stocksWallet[0]).to.have.property('date');
    });

    it('A chave stocksTransactions deve ser um array de objetos', async () => {
      const result = await service.getCustomerStocks(1);

      expect(result.stocksTransactions).to.be.an('array');
      expect(result.stocksTransactions[0]).to.be.an('object');
      expect(result.stocksTransactions[0]).to.have.property('transactionId');
      expect(result.stocksTransactions[0]).to.have.property('name');
      expect(result.stocksTransactions[0]).to.have.property('quantity');
      expect(result.stocksTransactions[0]).to.have.property('companyName');
      expect(result.stocksTransactions[0]).to.have.property('date');
      expect(result.stocksTransactions[0]).to.have.property('transactionType');
    });
  });

  describe('Quando a carteira e as transações de ações NÃO são encotradas', () => {
    it("A chave stocksWallet deve conter uma mensagem com `You don't have any stocks in your wallet`", async () => {
      const result = await service.getCustomerStocks(999);

      expect(result.stocksWallet[0]).to.be.deep.equal(mocks.stocksErrors.stocksWallet[0]);
    });

    it('A chave stocksTransactions deve conter uma mensagem com `You have not executed any stock transactions yet`', async () => {
      const result = await service.getCustomerStocks(999);

      expect(result.stocksTransactions[0]).to.be.deep
        .equal(mocks.stocksErrors.stocksTransactions[0]);
    });
  });
});
