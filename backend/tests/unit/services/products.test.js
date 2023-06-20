const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { productsMock } = require('../mocks/product.mock');

describe('Testes da camada Service de Produtos', () => {
    afterEach(() => sinon.restore());

    describe('Teste da função getAll', () => {
        it('Retorna a lista com todos os produtos', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'getAll').resolves(productsMock);
            // ACT
            const result = await productsService.getAll();
            // ASSERT
            expect(result).to.be.deep.equal(productsMock);
        });
    });

    describe('Teste da função getById', () => {
        it('Retorna um objeto do produto pesquisado pelo id', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'getById').resolves(productsMock[0]);
            // ACT
            const result = await productsService.getById(7);
            // ASSERT
            expect(result).to.be.deep.equal(productsMock[0]);
        });
    });

    describe('Teste da função create', () => {
        it('Retorna o id do produto criado', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'create').resolves(1);
            // ACT
            const result = await productsService.create('Xablau');
             // ASSERT
            expect(result).to.deep.equal({ type: null, message: { id: 1, name: 'Xablau' } });
        });

        it('Retorna erro de name', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'create').resolves(1);
            // ACT
            const result = await productsService.create('Xa');
             // ASSERT
            expect(result).to.deep.equal({ type: 422, message: 'name length must be at least 5 characters long' });
        });
    });

    describe('Teste da função update', () => {
        it('Retorna as info do produto atualizado', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'update').resolves(1);
            // ACT
            const result = await productsService.update({ name: 'ProdutoX', id: 7 });
            // ASSERT
            expect(result).to.be.deep.equal({ type: null, message: { name: 'ProdutoX', id: 7 }});
        });
        it('Retorna erro de name', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'update').resolves(1);
            // ACT
            const result = await productsService.update({ name: 'Pro', id: 7 });
             // ASSERT
            expect(result).to.deep.equal({ type: 422, message: 'name length must be at least 5 characters long' });
        });
        it('Retorna product not found', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'update').resolves(0);
            // ACT
            const result = await productsService.update({ name: 'ProdutoX', id: 99 });
             // ASSERT
            expect(result).to.deep.equal({ type: 404, message: 'Product not found' });
        });
        it('Retorna product not found', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'update').resolves(0);
            // ACT
            const result = await productsService.update({ id: 99 });
             // ASSERT
            expect(result).to.deep.equal({ type: 400, message: 'name is required' });
        });
        
        
    });

    describe('Teste da função drop', () => {
        it('Retorna type null quando sucesso', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'drop').resolves(1);
            // ACT
            const result = await productsService.drop(1);
             // ASSERT
            expect(result).to.deep.equal({ type: null });
        });
        it('Retorna product not found', async () => {
            // ARRANGE
            sinon.stub(productsModel, 'drop').resolves(0);
            // ACT
            const result = await productsService.drop(99);
             // ASSERT
            expect(result).to.deep.equal({ type: 404, message: 'Product not found' });
        });
    });
});