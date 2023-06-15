const productsModel = require('../../models/productsModel');

const validateProductId = async (items) => {
  console.log(items);
  const allProductsId = (await productsModel.getAll()).map((product) => product.id);
  console.log(allProductsId);
  const isIdValid = items.every((item) => allProductsId.includes(item.productId));
  console.log(isIdValid);
  return isIdValid;
};

module.exports = { validateProductId };
