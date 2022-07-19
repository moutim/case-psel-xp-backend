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
  const response = { locals: { payload: { customerId: 1 } } };
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

  it('Deve retornar um JSON com a mensagem "Information updated successfully"', async () => {
    await controller.updateCustomerInfos(request, response);
    expect(response.json.calledWith(mocks.informationUpdated)).to.be.true;
  });
});

describe('Verifica os retornos da função withdraw na camada de CONTROLLER', () => {
  const response = { locals: { payload: { customerId: 1 } } };
  const request = { body: { value: 50 } };

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'withdraw').resolves(mocks.withdrawSuccessful);
  });

  afterEach(() => {
    service.withdraw.restore();
  });

  it('O status retornado deve ser 200', async () => {
    await controller.withdraw(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('Deve retornar um JSON com a mensagem "Withdraw successful"', async () => {
    await controller.withdraw(request, response);
    expect(response.json.calledWith(mocks.withdrawSuccessful)).to.be.true;
  });
});

describe('Verifica os retornos da função deposit na camada de CONTROLLER', () => {
  const response = { locals: { payload: { customerId: 1 } } };
  const request = { body: { value: 50 } };

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'deposit').resolves(mocks.depositMadeSuccessfully);
  });

  afterEach(() => {
    service.deposit.restore();
  });

  it('O status retornado deve ser 200', async () => {
    await controller.deposit(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('Deve retornar um JSON com a mensagem "Deposit made successfully"', async () => {
    await controller.deposit(request, response);
    expect(response.json.calledWith(mocks.depositMadeSuccessfully)).to.be.true;
  });
});

describe('Verifica os retornos da função deleteCustomer na camada de CONTROLLER', () => {
  const response = { locals: { payload: { customerId: 1 } } };
  const request = {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'deleteCustomer').resolves(mocks.customerDeleted);
  });

  afterEach(() => {
    service.deleteCustomer.restore();
  });

  it('O status retornado deve ser 200', async () => {
    await controller.deleteCustomer(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('Deve retornar um JSON com a mensagem "User successfully deleted"', async () => {
    await controller.deleteCustomer(request, response);
    expect(response.json.calledWith(mocks.customerDeleted)).to.be.true;
  });
});
