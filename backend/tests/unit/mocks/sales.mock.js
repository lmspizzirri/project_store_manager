const salesMock = [
    {
      saleId: 10,
      date: '2023-06-20T00:25:14.000Z',
      productId: 7,
      quantity: 1,
    },
    {
      saleId: 11,
      date: '2023-06-20T00:25:52.000Z',
      productId: 7,
      quantity: 1,
    },
    {
      saleId: 12,
      date: '2023-06-20T00:26:37.000Z',
      productId: 7,
      quantity: 1,
    },
    {
      saleId: 13,
      date: '2023-06-20T00:29:02.000Z',
      productId: 7,
      quantity: 1,
    },
    {
      saleId: 14,
      date: '2023-06-20T00:29:51.000Z',
      productId: 7,
      quantity: 1,
    },
];
const getAllId = [
  1,
  2,
  3,
];

const salesCreateMock = {
    id: 10,
    itemsSold:
      {
        productId: 1,
        quantity: 1,
      },
  };

const soldItem = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const returnSaleData = {
  type: null,
  message: soldItem,
};

const searchResult = [
  {
    date: '2023-06-20T08:46:21.000Z',
    productId: 3,
    quantity: 15,
  },
];

const getByIdMock = [
     {
        date: '2023-06-20T08:46:21.000Z',
        productId: 3,
        quantity: 15,
      },
    ];

module.exports = {
  getAllId,
  salesMock, 
  salesCreateMock, 
  soldItem, 
  returnSaleData, 
  searchResult, 
  getByIdMock };
