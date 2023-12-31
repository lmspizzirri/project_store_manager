const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { productsMock, searchResult, allProducts } = require('../mocks/product.mock');

describe('Testes da camada model de Produtos', function () {
    afterEach(function () { return sinon.restore(); });

    describe('Teste da função getAll', function () {
        it('Retorna a lista com todos os produtos', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([allProducts]);
            // ACT
            const result = await productsModel.getAll();
            // ASSERT
            expect(result).to.be.an('array');
            expect(result).to.be.deep.equal(allProducts);
        });
    });

    describe('Teste da função searchName', function () {
        it('Retorna a lista com todos os produtos', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([allProducts]);
            // ACT
            const result = await productsModel.searchName('');
            // ASSERT
            expect(result).to.be.deep.equal(allProducts);
        });

        // it('Retorna a lista vazia', async function () {
        //     // ARRANGE
        //     sinon.stub(connection, 'execute').resolves([]);
        //     // ACT
        //     const result = await productsModel.searchName('z');
        //     // ASSERT
        //     expect(result).to.be.equal([]);
        // });

        it('Retorna o resultado da pesquisa', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([searchResult]);
            // ACT
            const result = await productsModel.searchName('martelo');
            // ASSERT
            expect(result).to.be.deep.equal(searchResult);
        });
    });

    describe('Teste da função getById', function () {
        it('Retorna um objeto do produto pesquisado pelo id', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
            // ACT
            const result = await productsModel.getById(7);
            // ASSERT
            expect(result).to.be.an('object');
            expect(result).to.be.deep.equal(productsMock[0]);
        });
    });

    describe('Teste da função create', function () {
        it('Retorna o id do produto criado', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
            // ACT
            const result = await productsModel.create('Produto X');
             // ASSERT
            expect(result).to.equal(1);
        });
    });

    describe('Teste da função update', function () {
        it('Retorna a quantidade de linhas afetadas', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
            // ACT
            const result = await productsModel.update(1, 'Cogumelo');
             // ASSERT
            expect(result).to.equal(1);
        });
    });

    describe('Teste da função drop', function () {
        it('Retorna a quantidade de linhas afetadas', async function () {
            // ARRANGE
            sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
            // ACT
            const result = await productsModel.drop(1);
             // ASSERT
            expect(result).to.equal(1);
        });
    });
});
