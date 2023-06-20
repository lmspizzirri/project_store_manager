const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
    const result = await salesService.getAll();
    res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesService.getById(id);
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
};

const create = async (req, res) => {
    const info = req.body;
    const { type, message } = await salesService.create(info);
    if (type) return res.status(type).json({ message });
    return res.status(201).json({
        id: message,
        itemsSold: info,
    });
};

const drop = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesService.drop(id);
    if (type) {
        return res.status(type).json({ message });
    }
    return res.status(204).end();
};

module.exports = { getAll, getById, create, drop };
