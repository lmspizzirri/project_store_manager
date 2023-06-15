const salesModel = require('../models/salesModel');
const { validateProductId } = require('./validation/productIdValidation');

const getAll = async () => {
    const result = await salesModel.getAll();
    return result;
};

const getById = async (id) => {
    const result = await salesModel.getById(id);
    return result;
};

const create = async (info) => {
    const isProductIdValid = await validateProductId(info);
    if (!isProductIdValid) {
        return { type: 404, message: 'Product not found' };
    }
    const result = await salesModel.create(info);
    return result;
};

module.exports = { getAll, getById, create };
