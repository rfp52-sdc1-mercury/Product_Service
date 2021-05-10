const mongoose = require('mongoose');
const db = require('../index.js');
const Features = require('./Features.js');

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [Features.schema],
});

const Product = mongoose.model('Product', productSchema);

let find = (product_id, callback) => {
  Product.findOne({id: product_id}, {_id: 0}, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  })
}

module.exports.find = find;