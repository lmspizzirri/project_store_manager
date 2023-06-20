const nameValidation = require('../middlewares/nameValidation');
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
    if(!name) {
        return { type: '400', message: '"name" is required'}
    }
    const { type, message } = nameValidation(name);
    if (type) {
        return { type, message };
    }
    const result = await productsModel.create(name);
    return { type: null, message: { id: result, name: name } };
};

const update = async (id, name) => {
    if (!name) {
        return { type: 400, message: '"name" is required' };
    }
    const { type, message } = await nameValidation(name);
    if (type) {
        return { type, message };
    }
    const result = await productsModel.update(id, name);
    if (!result) {
        return { type: 404, message: 'Product not found' };
    }
    return { type: null, message: { id, name } };
};

const drop = async (id) => {
    const result = await productsModel.drop(id);
    if (!result) {
        return { type: 404, message: 'Product not found' };
    }
    return { type: null };
};

module.exports = { getAll, getById, create, update, drop };
