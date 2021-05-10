const db = require('./index.js');
const Product = require('./Schemas/Product.js');
const Style = require('./Schemas/Style.js');
const Features = require('./Schemas/Features.js');
const Skus = require('./Schemas/Skus.js');
const Photos = require('./Schemas/Photos.js');

// let testFeatures = new Features.model({
//   Product_id: 1,
//   Fabric: "YES",
//   Canvas: "NO",
// });

// let testProduct = new Product.model({
//   name: "Big Shirt",
//   slogan: "a big shirt",
//   description: "Big shirt",
//   category: "Clothes",
//   default_price: "100",
// })

// testProduct.features.push(testFeatures);

// console.log(testProduct);

let testSkus = new Skus.model({
  styleId: 1,
  size: "M",
  quantity: 10,
})

let testPhotos = new Photos.model({
  styleId: 1,
  url: "url",
  thumbnail_url: "thumbnail_url",
})

let testStyle = new Style.model({
  productId: 1,
  name: "Hot",
  sale_price: "null",
  original_price: "100",
  default_style: 1,
  photos: [testPhotos],
  skus: {[testSkus.styleId]: testSkus}
})

console.log(testStyle);