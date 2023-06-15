const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();
productsRoute.get('/', productsController.getAll);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', productsController.create);
productsRoute.put('/:id', productsController.update);
productsRoute.delete('/:id', productsController.drop);

module.exports = productsRoute;