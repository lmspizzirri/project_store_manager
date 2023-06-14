const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();
salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.getById);
salesRoute.post('/', salesController.create);

module.exports = salesRoute;
