const productsModel = require('../../models/productsModel');

const validateProductId = async (items) => {
  const allProductsId = (await productsModel.getAll()).map((product) => product.id);
  const isIdValid = items.every((item) => allProductsId.includes(item.productId));
  return isIdValid;
};

module.exports = { validateProductId };
