const {
  describe, beforeEach, afterEach, it,
} = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const service = require('../../../src/services/register.service');
const controller = require('../../../src/controllers/register.controller');
const mocks = require('../mocks/register.mock');

describe('Verifica os retornos da função newRegister na camada de CONTROLLER', () => {
  const response = { locals: { payload: { customerId: 1 } } };
  const request = {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'newRegister').resolves(mocks.resultNewRegister);
  });

  afterEach(() => {
    service.newRegister.restore();
  });

  it('O status retornado deve ser 201', async () => {
    await controller.newRegister(request, response);
    expect(response.status.calledWith(201)).to.be.true;
  });

  it('Deve retornar um JSON com as informações do cliente', async () => {
    await controller.newRegister(request, response);
    expect(response.json.calledWith(mocks.resultNewRegister)).to.be.true;
  });
});
