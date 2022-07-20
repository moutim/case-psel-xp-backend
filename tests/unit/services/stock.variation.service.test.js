const { expect } = require('chai');
const { describe, afterEach, it } = require('mocha');
const sinon = require('sinon');
const variationStock = require('../../../src/services/stock.variation.service');
const { stock, stockVariation } = require('../../../src/database/models');
const mocksStock = require('../mocks/stock.mock');
const mocks = require('../mocks/stock.variation.mock');

describe('Verifica os retornos da função variationStock na camada de SERVICE', () => {
  describe('Quando as ações são atualizadas com sucesso', () => {
    afterEach(() => {
      stock.findAll.restore();
    });

    it('Retorna um objeto com as stocks disponíveis', async () => {
      sinon.stub(stock, 'findAll').resolves([{ dataValues: mocksStock.stocks }]);
      sinon.stub(stock, 'update').resolves(true);
      sinon.stub(stockVariation, 'create').resolves(false);

      const result = await variationStock();
      expect(result).to.be.equal(mocks.stocksPriceUpdated);
    });
  });
});
