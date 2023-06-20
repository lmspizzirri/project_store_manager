const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const productsModel = require('../../../src/models/productsModel');
const { salesMock, searchResult } = require('../mocks/sales.mock');
const { allProducts } = require('../mocks/product.mock');

describe('Testes da camada Service de Vendas', function () {
    afterEach(function () { return sinon.restore(); });
    describe('Teste da função getAll', function () {
        it('Retorna a lista com todos as vendas', async function () {
            // ARRANGE
            sinon.stub(salesModel, 'getAll').resolves(salesMock);
            // ACT
            const result = await salesService.getAll();
            // ASSERT
            expect(result).to.be.deep.equal(salesMock);
        });
    });

    describe('Teste da função getById', function () {
        it('Retorna um objeto da venda pesquisada pelo id', async function () {
            // ARRANGE
            sinon.stub(salesModel, 'getById').resolves(searchResult);
            // ACT
            const result = await salesService.getById(2);
            // ASSERT
            expect(result).to.be.deep.equal({ type: null, message: searchResult });
        });

        it('Retorna sale not found', async function () {
            // ARRANGE
            sinon.stub(salesModel, 'getById').resolves([]);
            // ACT
            const result = await salesService.getById(8);
            // ASSERT
            expect(result).to.be.deep.equal({ type: 404, message: 'Sale not found' });
        });
    });

    describe('Teste da função create', function () {
        it('Retorna o id da venda criada', async function () {
            // ARRANGE
            sinon.stub(salesModel, 'create').resolves(1);
            sinon.stub(productsModel, 'getAll').resolves(allProducts);
            // ACT
            const result = await salesService.create([{ productId: 1, quantity: 1 }]);
             // ASSERT
            expect(result).to.deep.equal({ type: null, message: 1 });
        });

        // it('Retorna product not found', async function () {
        //     // ARRANGE
        //     // ACT
        //     const result = await salesService.create([{ productId: 8, quantity: 1 }]);
        //      // ASSERT
        //     expect(result).to.deep.equal({ type: 404, message: 'Product not found' });
        // });
    });

    describe('Teste da função drop', function () {
        it('Retorna type null quando sucesso', async function () {
            // ARRANGE
            sinon.stub(salesModel, 'drop').resolves(1);
            // ACT
            const result = await salesService.drop(1);
             // ASSERT
            expect(result).to.deep.equal({ type: null });
        });
        it('Retorna product not found', async function () {
            // ARRANGE
            sinon.stub(salesModel, 'drop').resolves(0);
            // ACT
            const result = await salesService.drop(99);
             // ASSERT
            expect(result).to.deep.equal({ type: 404, message: 'Sale not found' });
        });
    });
});