const productIdValidation = (req, res, next) => {
    const [{ productId }] = req.body;
    if (!productId) { return res.status(400).json({ message: '"productId" is required' }); }
    next();
};

const quantityReceived = (req, res, next) => {
    const [{ quantity }] = req.body;
    if (quantity === undefined) { 
        return res.status(400).json({ message: '"quantity" is required' }); 
}
    next();
};

const quantityValidation = (req, res, next) => {
    const [{ quantity }] = req.body;
    if (quantity < 1) { 
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
};

module.exports = { quantityValidation, productIdValidation, quantityReceived };
