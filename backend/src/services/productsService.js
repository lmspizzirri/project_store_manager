const productsModel = require('../models/productsModel');

const getAll = async () => {
    const result = await productsModel.getAll();
    return result;
};

const getById = async (id) => {
    const result = await productsModel.getById(id);
    return result;
};

const create = async (name) => {
    const result = await productsModel.create(name);
    return result;
};

module.exports = { getAll, getById, create };
