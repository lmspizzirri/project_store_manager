const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const { salesMock } = require('../mocks/sales.mock');

describe('Testes da camada model de Sales', function () {
    afterEach(function () { return sinon.restore(); });

    describe('Teste da função getAll', function () {
        it('Retorna todas as vendas cadastradas', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([salesMock]);
            // ACT
            const result = await salesModel.getAll();
            // ASSERT
            expect(result).to.be.deep.equal(salesMock);
        });
    });

    describe('Teste da função getById', function () {
        it('Retorna um objeto da sale pesquisado pelo id', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([salesMock[0]]);
            // ACT
            const result = await salesModel.getById(10);
            // ASSERT
            expect(result).to.deep.equal(salesMock[0]);
        });
    });

    describe('Teste da função create', function () {
        it('Retorna o id da sale criada', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
            // ACT
            const result = await salesModel.create([{ productId: 7, quantity: 1 }]);
             // ASSERT
            expect(result).to.equal(1);
        });
    });

    describe('Teste da função drop', function () {
        it('Retorna a quantidade de linhas afetadas', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
            // ACT
            const result = await salesModel.drop(10);
             // ASSERT
            expect(result).to.equal(1);
        });
    });
});