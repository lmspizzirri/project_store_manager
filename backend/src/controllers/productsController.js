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

const update = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const items = [{ name, productId: id }];
    const result = await productsService.update(items);
    res.status(201).json(result);
};

const drop = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { type, message } = await productsService.drop(id);
    console.log(type, message);
    if (type) {
        return res.status(type).json({ message });
    }
    return res.status(204).end();
};

module.exports = { getAll, getById, create, update, drop };
