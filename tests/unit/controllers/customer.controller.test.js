const {
  describe, beforeEach, afterEach, it,
} = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const service = require('../../../src/services/customer.service');
const controller = require('../../../src/controllers/customer.controller');
const mocks = require('../mocks/customer.mock');

describe('Verifica os retornos da função getCustomerInfos na camada de CONTROLLER', () => {
  const response = { locals: { payload: { customerId: 1 } } };
  const request = {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'getCustomerInfos').resolves(mocks.resultGetCustomerInfos);
  });

  afterEach(() => {
    service.getCustomerInfos.restore();
  });

  it('O status retornado deve ser 200', async () => {
    await controller.getCustomerInfos(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('Deve retornar um JSON com as informações do cliente', async () => {
    await controller.getCustomerInfos(request, response);
    expect(response.json.calledWith(mocks.resultGetCustomerInfos)).to.be.true;
  });
});

describe('Verifica os retornos da função updateCustomerInfos na camada de CONTROLLER', () => {
  const response = {
    locals: { payload: { customerId: 1 } },
    body: { password: 'newPassword', email: 'newEmail' },
  };
  const request = {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'updateCustomerInfos').resolves(mocks.informationUpdated);
  });

  afterEach(() => {
    service.updateCustomerInfos.restore();
  });

  it('O status retornado deve ser 200', async () => {
    await controller.updateCustomerInfos(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('Deve retornar um JSON com as informações do cliente', async () => {
    await controller.updateCustomerInfos(request, response);
    expect(response.json.calledWith(mocks.informationUpdated)).to.be.true;
  });
});
