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
    const { type, message } = await productsService.create(name);
    if (type) { return res.status(type).json({ message }); }
    return res.status(201).json(message);
};

const update = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const { type, message } = await productsService.update(Number(id), name);
    if (type) {
        return res.status(type).json({ message });
    }
    return res.status(200).json(message);
};

const drop = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.drop(id);
    if (type) {
        return res.status(type).json({ message });
    }
    return res.status(204).end();
};

const searchName = async (req, res) => {
    const { q } = req.query;
    const { type, message } = await productsService.searchName(q);
    res.status(type).json(message);
};

module.exports = { getAll, getById, create, update, drop, searchName };
