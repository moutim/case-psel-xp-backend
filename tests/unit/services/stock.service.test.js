const { describe, afterEach, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const { stock } = require('../../../src/database/models');
const mocks = require('../mocks/stock.mock');
const service = require('../../../src/services/stock.service');

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
