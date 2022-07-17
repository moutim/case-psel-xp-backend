const { expect } = require('chai');
const {
  describe, beforeEach, afterEach, it,
} = require('mocha');
const sinon = require('sinon');
const controller = require('../../../src/controllers/login.controller');
const service = require('../../../src/services/login.service');
const mocks = require('../mocks/login.mock');

describe('Verifica se a função "login" da camada de controllers tem os retornos esperados', () => {
  const response = {};
  const request = {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'login').resolves(mocks.resultLogin);
  });

  afterEach(() => {
    service.login.restore();
  });

  it('O status retornado deve ser 200', async () => {
    await controller.login(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('Deve retornar um JSON com o token de autorização', async () => {
    await controller.login(request, response);
    expect(response.json.calledWith(mocks.resultLogin)).to.be.true;
  });
});
