const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
    const result = await salesService.getAll();
    res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await salesService.getById(id);
    if (result.length === 0) { return res.status(404).json({ message: 'Sale not found' }); }
    res.status(200).json(result);
};

const create = async (req, res) => {
    const info = req.body;
    const result = await salesService.create(info);
    res.status(201).json({
        id: result.insertId,
        itemsSold: info,
    });
};

module.exports = { getAll, getById, create };
