const productIdValidation = (req, res, next) => {
    const [{ productId }] = req.body;
    if (!productId) { return res.status(400).json({ messsage: 'productId is required' }); }
    next();
};

const quantityValidation = (req, res, next) => {
    const [{ quantity }] = req.body;
    if (!quantity) { return res.status(400).json({ messsage: 'quantity is required' }); }
    if (quantity < 1) { 
    return res.status(400).json({ message: 'quantity must be greater than or equal to 1' }); 
    }
    next();
};

module.exports = { quantityValidation, productIdValidation };
