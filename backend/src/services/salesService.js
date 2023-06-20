const salesModel = require('../models/salesModel');
const { validateProductId } = require('./validation/productIdValidation');

const getAll = async () => {
    const result = await salesModel.getAll();
    return result;
};

const getById = async (id) => {
    const result = await salesModel.getById(id);
    if (!result || result.length === 0) { return { type: 404, message: 'Sale not found' }; } 
    return { type: null, message: result };
};

const create = async (products) => {
    const isProductIdValid = await validateProductId(products);
    if (!isProductIdValid) {
        return { type: 404, message: 'Product not found' };
    }
    const result = await salesModel.create(products);
    return { type: null, message: result };
};

const drop = async (id) => {
    const result = await salesModel.drop(id);
    if (!result) {
        return { type: 404, message: 'Sale not found' };
    }
    return { type: null };
};

module.exports = { getAll, getById, create, drop };
