const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { productsMock } = require('../mocks/product.mock');

describe('Testes da camada model de Produtos', () => {
    afterEach(() => sinon.restore());

    describe('Teste da função getAll', () => {
        it('Retorna a lista com todos os produtos', async () => {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([productsMock]);
            // ACT
            const result = await productsModel.getAll();
            // ASSERT
            expect(result).to.be.an('array');
            expect(result).to.be.deep.equal(productsMock);
        });
    });

    describe('Teste da função getById', () => {
        it('Retorna um objeto do produto pesquisado pelo id', async () => {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
            // ACT
            const result = await productsModel.getById(7);
            // ASSERT
            expect(result).to.be.an('object');
            expect(result).to.be.deep.equal(productsMock[0]);
        });
    });

    describe('Teste da função create', () => {
        it('Retorna o id do produto criado', async () => {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
            // ACT
            const result = await productsModel.create('Produto X');
             // ASSERT
            expect(result).to.equal(1);
        });
    });

    describe('Teste da função update', () => {
        it('Retorna a quantidade de linhas afetadas', async () => {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
            // ACT
            const result = await productsModel.update(1, 'Cogumelo');
             // ASSERT
            expect(result).to.equal(1);
        });
    });

    describe('Teste da função drop', () => {
        it('Retorna a quantidade de linhas afetadas', async () => {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
            // ACT
            const result = await productsModel.drop(1);
             // ASSERT
            expect(result).to.equal(1);
        });
    });

    


});