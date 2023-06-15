const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { productIdValidation, quantityValidation } = require('../middlewares/salePostValidation');

const salesRoute = Router();
salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.getById);
salesRoute.post(
    '/', 
    productIdValidation, 
    quantityValidation, 
    salesController.create,
);

module.exports = salesRoute;
