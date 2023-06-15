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

const update = async (items) => {
    const result = await productsModel.update(items);
    if (!result) {
        return { type: 404, message: 'Product not found' };
    }
    return { type: null, message: { items } };
};

const drop = async (id) => {
    const result = await productsModel.drop(id);
    if (!result) {
        return { type: 404, message: 'Product not found' };
    }
    return { type: null };
};

module.exports = { getAll, getById, create, update, drop };
