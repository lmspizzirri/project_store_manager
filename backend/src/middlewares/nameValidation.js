const nameValidation = (name) => {
    if (name.length < 5) { 
      return { type: 422, message: '"name" length must be at least 5 characters long' };
    }
    return { type: null };
};

module.exports = nameValidation;