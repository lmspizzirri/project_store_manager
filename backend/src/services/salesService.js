const salesModel = require('../models/salesModel');

const getAll = async () => {
    const result = await salesModel.getAll();
    return result;
};

const getById = async (id) => {
    const result = await salesModel.getById(id);
    return result;
};

const create = async (info) => {
    const result = await salesModel.create(info);
    return result;
};

module.exports = { getAll, getById, create };
