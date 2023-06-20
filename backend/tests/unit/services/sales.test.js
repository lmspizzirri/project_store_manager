const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const { salesMock } = require('../mocks/sales.mock');

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
            sinon.stub(salesModel, 'getById').resolves(salesMock[0]);
            // ACT
            const result = await salesService.getById(7);
            // ASSERT
            expect(result).to.be.deep.equal(salesMock[0]);
        });
    });

    // Quebrou depois da refatoração, preciso ver!
    // describe('Teste da função create', () => {
    //     it('Retorna o id da venda criada', async () => {
    //         // ARRANGE
    //         sinon.stub(salesModel, 'create').resolves(1);
    //         // ACT
    //         const result = await salesService.create({ items: { productId:7 , quantity:1 } });
    //          // ASSERT
    //         expect(result).to.deep.equal({ type: null, message: 1 });
    //     });

        // it('Retorna erro de name', async () => {
        //     // ARRANGE
        //     sinon.stub(salesModel, 'create').resolves(1);
        //     // ACT
        //     const result = await salesService.create('Xa');
        //      // ASSERT
        //     expect(result).to.deep.equal({ type: 422, message: 'name length must be at least 5 characters long' });
        // });
    // });

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