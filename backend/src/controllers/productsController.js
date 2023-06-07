const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
    const result = await productsService.getAll();
    res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await productsService.getById(id);
    if (result === undefined) { return res.status(404).json({ message: 'Product not found' }); }
    res.status(200).json(result);
};

const create = async (req, res) => {
    const { name } = req.body;
    const result = await productsService.create(name);
    res.status(201).json(result);
};

module.exports = { getAll, getById, create };
