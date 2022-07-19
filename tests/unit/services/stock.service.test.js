const { describe, afterEach, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const {
  stock, customer, customerStockTransaction, customerStockWallet,
} = require('../../../src/database/models');
const mocks = require('../mocks/stock.mock');
const service = require('../../../src/services/stock.service');
const customerService = require('../../../src/services/customer.service');
const mocksCustomer = require('../mocks/customer.mock');

describe('Verifica os retornos da função getStocks na camada de SERVICE', () => {
  describe('Quando encontra stocks no banco', () => {
    afterEach(() => {
      stock.findAll.restore();
    });

    it('Retorna um objeto com as stocks disponíveis', async () => {
      sinon.stub(stock, 'findAll').resolves(mocks.stocks);

      const result = await service.getStocks();

      expect(result).to.be.deep.equal(mocks.stocks);
    });
  });

  describe('Quando não encontra stocks no banco', () => {
    afterEach(() => {
      stock.findAll.restore();
    });

    it('Retorna um erro com "There are no stocks available at the moment"', async () => {
      sinon.stub(stock, 'findAll').resolves([]);

      try {
        await service.getStocks();
      } catch (error) {
        expect(error).to.be.deep.equal(mocks.stocksNotFound);
      }
    });
  });
});

describe('Verifica os retornos da função buyStocks na camada de SERVICE', () => {
  describe('Quando a compra é realizada com sucesso e o cliente NÃO possui stocks', () => {
    afterEach(() => {
      customerService.getCustomerInfos.restore();
      stock.findOne.restore();
      customer.update.restore();
      stock.update.restore();
      customerStockTransaction.create.restore();
      customerStockWallet.findOne.restore();
      customerStockWallet.create.restore();
    });

    it('Retorna um objeto com a mensagem "Purchase successful" e o transactionId', async () => {
      sinon.stub(customerService, 'getCustomerInfos').resolves({ dataValues: mocksCustomer.resultGetCustomerInfos });
      sinon.stub(stock, 'findOne').resolves({ dataValues: mocks.stocks[0] });
      sinon.stub(customer, 'update').resolves(true);
      sinon.stub(stock, 'update').resolves(true);
      sinon.stub(customerStockTransaction, 'create').resolves({ dataValues: { transactionId: 10 } });
      sinon.stub(customerStockWallet, 'findOne').resolves(false);
      sinon.stub(customerStockWallet, 'create').resolves(true);

      const result = await service.buyStocks(1, { stockId: 1, quantity: 1 });

      expect(result).to.deep.equal(mocks.buyMade);
    });
  });

  describe('Quando a compra é realizada com sucesso e o cliente JÁ POSSUI stocks', () => {
    afterEach(() => {
      customerService.getCustomerInfos.restore();
      stock.findOne.restore();
      customer.update.restore();
      stock.update.restore();
      customerStockTransaction.create.restore();
      customerStockWallet.findOne.restore();
      customerStockWallet.update.restore();
    });

    it('Retorna um objeto com a mensagem "Purchase successful" e o transactionId', async () => {
      sinon.stub(customerService, 'getCustomerInfos').resolves({ dataValues: mocksCustomer.resultGetCustomerInfos });
      sinon.stub(stock, 'findOne').resolves({ dataValues: mocks.stocks[0] });
      sinon.stub(customer, 'update').resolves(true);
      sinon.stub(stock, 'update').resolves(true);
      sinon.stub(customerStockTransaction, 'create').resolves({ dataValues: { transactionId: 10 } });
      sinon.stub(customerStockWallet, 'findOne').resolves({ dataValues: mocks.customerStockWallet });
      sinon.stub(customerStockWallet, 'update').resolves(true);

      const result = await service.buyStocks(1, { stockId: 1, quantity: 1 });

      expect(result).to.deep.equal(mocks.buyMade);
    });
  });

  describe('Quando a compra NÃO é realizada com sucesso', () => {
    afterEach(() => {
      customerService.getCustomerInfos.restore();
      stock.findOne.restore();
      customer.update.restore();
      stock.update.restore();
    });

    it('Retorna um erro com a mensagem "An error occurred while performing the transaction"', async () => {
      sinon.stub(customerService, 'getCustomerInfos').resolves({ dataValues: mocksCustomer.resultGetCustomerInfos });
      sinon.stub(stock, 'findOne').resolves({ dataValues: mocks.stocks[0] });
      sinon.stub(customer, 'update').resolves(true);
      sinon.stub(stock, 'update').resolves(false);
      sinon.stub(customerStockWallet, 'create').resolves(false);

      try {
        await service.buyStocks(1, { stockId: 1, quantity: 1 });
      } catch (error) {
        expect(error).to.deep.equal(mocks.transactionError);
      }
    });
  });

  describe('Quando a ação não é encontrada no banco', () => {
    afterEach(() => {
      customerService.getCustomerInfos.restore();
      stock.findOne.restore();
    });

    it('Retorna um erro com a mensagem "Stock with id 1 not found"', async () => {
      sinon.stub(customerService, 'getCustomerInfos').resolves({ dataValues: mocksCustomer.resultGetCustomerInfos });
      sinon.stub(stock, 'findOne').resolves(false);

      try {
        await service.buyStocks(1, { stockId: 1, quantity: 1 });
      } catch (error) {
        expect(error).to.deep.equal(mocks.stockNotFound);
      }
    });
  });

  describe('Quando não existe ações suficiente para a compra', () => {
    afterEach(() => {
      customerService.getCustomerInfos.restore();
      stock.findOne.restore();
    });

    it('Retorna um erro com a mensagem "There are not enough stocks to make the purchase"', async () => {
      sinon.stub(customerService, 'getCustomerInfos').resolves({ dataValues: mocksCustomer.resultGetCustomerInfos });
      sinon.stub(stock, 'findOne').resolves({ dataValues: mocks.stocks[0] });

      try {
        await service.buyStocks(1, { stockId: 1, quantity: 301 });
      } catch (error) {
        expect(error).to.deep.equal(mocks.insufficientStocks);
      }
    });
  });

  describe('Quando o cliente não tem saldo suficiente para a compra', () => {
    afterEach(() => {
      customerService.getCustomerInfos.restore();
      stock.findOne.restore();
    });

    it('Retorna um erro com a mensagem "There are not enough stocks to make the purchase"', async () => {
      sinon.stub(customerService, 'getCustomerInfos').resolves({ dataValues: mocksCustomer.resultGetCustomerInfos });
      sinon.stub(stock, 'findOne').resolves({ dataValues: mocks.stocks[0] });

      try {
        await service.buyStocks(1, { stockId: 1, quantity: 50 });
      } catch (error) {
        expect(error).to.deep.equal(mocks.insufficientBalance);
      }
    });
  });
});
