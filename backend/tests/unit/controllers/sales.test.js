const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { salesMock, salesCreateMock, soldItem, returnSaleData } = require('../mocks/sales.mock');

describe('Testes da camada controller de Vendas', () => {

    afterEach(() => sinon.restore());

    describe('Teste da função getAll', () => {
        it('Retorna a lista com todos as vendas', async () => {
            const req = {};
            const res = {};     
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(salesService, 'getAll').resolves(salesMock);
            // ACT
            await salesController.getAll(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(200);
            expect(res.json).to.be.calledWithExactly(salesMock);

        });
    });
    describe('Teste da função getById', () => {
        // it('Retorna lista com todas as vendas cadastradas', async () => {
        //     // ARRANGE
        //     const req = { params: { id: 1 }};
        //     const res = {};
        //     res.status = sinon.stub().returns(res);
        //     res.json = sinon.stub().returns();
        //     sinon.stub(salesService, 'getById').resolves(returnSaleData);
        //     // ACT
        //     await salesController.getById(req, res);
        //     // ASSERT
        //     expect(res.status).to.have.been.calledWith(200);
        //     expect(res.json).to.have.been.calledWith(soldItem);
        //   });
        
        it('Retorna product not found caso o id nao esteja na lista', async () => {
            const req = { params: { id: 1 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            // ARRANGE
            sinon.stub(salesService, 'getById').resolves({ type: 404, message: 'Sale not found' });
            // ACT
            await salesController.getById(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(404);
            expect(res.json).to.be.calledWithExactly({ message: 'Sale not found' });
        });
    });
    
    

    describe('Teste da função create', () => {
        it('Retorna a info da venda criada', async () => {
            const req = { body: { productId: 7, quantity: 1 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(salesService, 'create').resolves({ type: null, message: 10 });
            // ACT
            await salesController.create(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(201);
            expect(res.json).to.be.calledWithExactly(salesCreateMock[0]);
        });

        it('Retorna sale not found caso o id nao esteja na lista', async () => {
            const req = { body: { productId: 99, quantity: 1 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            // ARRANGE
            sinon.stub(salesService, 'create').resolves({ type: 404, message: 'Sale not found' });
            // ACT
            await salesController.create(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(404);
            expect(res.json).to.be.calledWithExactly({ message: 'Sale not found' });
        });
    });

    describe('Teste da função drop', () => {
        it('Retorna o codigo 204 de sucesso', async () => {
            const req = { params: { id: 1 } };
            const res = {};     
            res.status = sinon.stub().returns(res);
            res.end = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(salesService, 'drop').resolves({ type: null });
            // ACT
            await salesController.drop(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(204);
        });
        it('Retorna sale not found caso o id nao esteja na lista', async () => {
            const req = { body: { name: 'ProjetoX' }, params: { id: 99 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            // ARRANGE
            sinon.stub(salesService, 'drop').resolves({ type: 404, message: 'Sales not found' });
            // ACT
            await salesController.drop(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(404);
            expect(res.json).to.be.calledWithExactly({ message: 'Sales not found' });
        });
    });


});