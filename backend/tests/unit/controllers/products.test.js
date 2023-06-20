const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const { productsMock } = require('../mocks/product.mock');

const notFound = 'Product not found';

describe('Testes da camada controller de Produtos', function () {
    afterEach(function () { return sinon.restore(); });

    describe('Teste da função getAll', function () {
        it('Retorna a lista com todos os produtos', async function () {
            const req = {};
            const res = {};     
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(productsService, 'getAll').resolves(productsMock);
            // ACT
            await productsController.getAll(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(200);
            expect(res.json).to.be.calledWithExactly(productsMock);
        });
    });

    describe('Teste da função getById', function () {
        it('Retorna um objeto do produto pesquisado pelo id', async function () {
            const req = { params: { id: 1 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            // ARRANGE
            sinon.stub(productsService, 'getById').resolves(productsMock[0]);
            // ACT
            await productsController.getById(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(200);
            expect(res.json).to.be.calledWithExactly(productsMock[0]);
        });

        it('Retorna product not found caso o id nao esteja na lista', async function () {
            const req = { params: { id: 1 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            // ARRANGE
            sinon.stub(productsService, 'getById').resolves(undefined);
            // ACT
            await productsController.getById(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(404);
            expect(res.json).to.be.calledWithExactly({ message: notFound });
        });
    });

    describe('Teste da função create', function () {
        it('Retorna a info do produto criado', async function () {
            const req = { body: { name: 'ProdutoX' } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(
                productsService,
                 'create',
                ).resolves({ type: null, message: productsMock[0] });
            // ACT
            await productsController.create(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(201);
            expect(res.json).to.be.calledWithExactly(productsMock[0]);
        });

        it('Retorna name invalid', async function () {
            const req = { body: { name: 'Prod' } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(productsService, 'create').resolves({ 
                type: 422, 
                message: '"name" length must be at least 5 characters long' });
            // ACT
            await productsController.create(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(422);
            expect(res.json).to.be
                .calledWithExactly({ message: '"name" length must be at least 5 characters long' });
        });
    });

    describe('Teste da função update', function () {
        it('Retorna as infos do produto atualizado', async function () {
            const req = { body: { name: 'ProdutoX' }, params: { id: 7 } };
            const res = {};     
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(productsService, 'update').resolves({ type: null });
            // ACTz 
            await productsController.update(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(200);
            expect(res.json).to.be.calledWithExactly(productsMock[0]);
        });

        it('Retorna name invalid', async function () {
            const req = { body: { name: 'Prod' }, params: { id: 7 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(productsService, 'update').resolves({ 
                type: 422, 
                message: 'name length must be at least 5 characters long' });
            // ACT
            await productsController.update(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(422);
            expect(res.json).to.be
                .calledWithExactly({ message: 'name length must be at least 5 characters long' });
        });

        it('Retorna product not found caso o id nao esteja na lista', async function () {
            const req = { body: { name: 'ProjetoX' }, params: { id: 99 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            // ARRANGE
            sinon.stub(productsService, 'update')
                .resolves({ type: 404, message: 'Product not found' });
            // ACT
            await productsController.update(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(404);
            expect(res.json).to.be.calledWithExactly({ message: notFound });
        });
    });

    describe('Teste da função drop', function () {
        it('Retorna o codigo 204 de sucesso', async function () {
            const req = { params: { id: 1 } };
            const res = {};     
            res.status = sinon.stub().returns(res);
            res.end = sinon.stub().returns();   
            // ARRANGE
            sinon.stub(productsService, 'drop').resolves({ type: null });
            // ACT
            await productsController.drop(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(204);
        });
        it('Retorna product not found caso o id nao esteja na lista', async function () {
            const req = { body: { name: 'ProjetoX' }, params: { id: 99 } };
            const res = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            // ARRANGE
            sinon.stub(productsService, 'drop')
                .resolves({ type: 404, message: 'Product not found' });
            // ACT
            await productsController.drop(req, res);
            // ASSERT
            expect(res.status).to.be.calledWith(404);
            expect(res.json).to.be.calledWithExactly({ message: notFound });
        });
    });
});
