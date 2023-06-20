const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { productsMock, allProducts, searchResult } = require('../mocks/product.mock');

describe('Testes da camada Service de Produtos', function () {
    afterEach(function () { return sinon.restore(); });

    describe('Teste da função getAll', function () {
        it('Retorna a lista com todos os produtos', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'getAll').resolves(productsMock);
            // ACT
            const result = await productsService.getAll();
            // ASSERT
            expect(result).to.be.deep.equal(productsMock);
        });
    });

    describe('Teste da função searchName', function () {
        it('Retorna a lista com todos os produtos', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'getAll').resolves(allProducts);
            // ACT
            const result = await productsService.searchName('');
            // ASSERT
            expect(result).to.be.deep.equal({ type: 200, message: allProducts });
        });

        it('Retorna a lista vazia', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'searchName').resolves([]);
            // ACT
            const result = await productsService.searchName('z');
            // ASSERT
            expect(result).to.be.deep.equal({ type: 200, message: [] });
        });

        it('Retorna resultado da pesquisa', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'searchName').resolves(searchResult);
            // ACT
            const result = await productsService.searchName('martelo');
            // ASSERT
            expect(result).to.be.deep.equal({ type: 200, message: searchResult });
        });
    });

    describe('Teste da função getById', function () {
        it('Retorna um objeto do produto pesquisado pelo id', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'getById').resolves(productsMock[0]);
            // ACT
            const result = await productsService.getById(7);
            // ASSERT
            expect(result).to.be.deep.equal(productsMock[0]);
        });
    });

    describe('Teste da função create', function () {
        it('Retorna o id do produto criado', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'create').resolves(1);
            // ACT
            const result = await productsService.create('Xablau');
             // ASSERT
            expect(result).to.deep.equal({ type: null, message: { id: 1, name: 'Xablau' } });
        });

        it('Retorna name is required', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'create').resolves(1);
            // ACT
            const result = await productsService.create('');
             // ASSERT
            expect(result).to.deep
                .equal({ type: 400, message: '"name" is required' });
        });

        it('Retorna erro de name', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'create').resolves(1);
            // ACT
            const result = await productsService.create('Xa');
             // ASSERT
            expect(result).to.deep
                .equal({ type: 422, message: '"name" length must be at least 5 characters long' });
        });
    });

    describe('Teste da função update', function () {
        it('Retorna as info do produto atualizado', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'update').resolves(1);
            // ACT
            const result = await productsService.update(7, 'ProdutoX');
            // ASSERT
            expect(result).to.be.deep.equal({ type: null, message: { id: 7, name: 'ProdutoX' } });
        });
        it('Retorna erro de name', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'update').resolves(1);
            // ACT
            const result = await productsService.update(7, 'Prot');
             // ASSERT
            expect(result).to.be.deep
                .equal({ type: 422, message: '"name" length must be at least 5 characters long' });
        });
        it('Retorna product not found', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'update').resolves(0);
            // ACT
            const result = await productsService.update(99, 'ProdutoX');
             // ASSERT
            expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
        });
        it('Name check', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'update').resolves(0);
            // ACT
            const result = await productsService.update({ id: 99 });
             // ASSERT
            expect(result).to.deep.equal({ type: 400, message: '"name" is required' });
        });
    });

    describe('Teste da função drop', function () {
        it('Retorna type null quando sucesso', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'drop').resolves(1);
            // ACT
            const result = await productsService.drop(1);
             // ASSERT
            expect(result).to.deep.equal({ type: null });
        });
        it('Retorna product not found', async function () {
            // ARRANGE
            sinon.stub(productsModel, 'drop').resolves(0);
            // ACT
            const result = await productsService.drop(99);
             // ASSERT
            expect(result).to.deep.equal({ type: 404, message: 'Product not found' });
        });
    });
});