const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { productIdValidation, quantityValidation, quantityReceived } = require('../middlewares/salePostValidation');

const salesRouter = Router();
salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post(
    '/', 
    productIdValidation,
    quantityReceived,
    quantityValidation, 
    salesController.create,
);
salesRouter.delete('/:id', salesController.drop);
salesRouter.put('/:saleId/products/:productId/quantity',
    quantityReceived,
    quantityValidation,
    productIdValidation,
salesController.update);

module.exports = salesRouter;
