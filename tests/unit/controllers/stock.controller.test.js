const { expect } = require('chai');
const {
  describe, afterEach, beforeEach, it,
} = require('mocha');
const sinon = require('sinon');
const service = require('../../../src/services/stock.service');
const controller = require('../../../src/controllers/stock.controller');
const mocks = require('../mocks/stock.mock');

describe('Verifica os retornos da função getStocks na camada de CONTROLLER', () => {
  const response = {};
  const request = {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'getStocks').resolves(mocks.stocks);
  });

  afterEach(() => {
    service.getStocks.restore();
  });

  it('O status retornado deve ser 200', async () => {
    await controller.getStocks(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('Deve retornar um JSON com as stocks', async () => {
    await controller.getStocks(request, response);
    expect(response.json.calledWith(mocks.stocks)).to.be.true;
  });
});
