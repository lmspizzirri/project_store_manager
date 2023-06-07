const { Router } = require('express');
const productsController = require('../controllers/productsController');
const nameValidation = require('../middlewares/nameValidation');

const productsRoute = Router();
productsRoute.get('/', productsController.getAll);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', nameValidation, productsController.create);

module.exports = productsRoute;