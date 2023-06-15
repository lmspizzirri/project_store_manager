const nameValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name) { return res.status(400).json({ messsage: 'name is required' }); }
    if (name.length < 5) { 
    return res.status(422).json({ messsage: 'name length must be at least 5 characters long' }); 
    }
    next();
};

module.exports = nameValidation;