const mongoose = require('mongoose');
const db = require('../index.js');

const allproductsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
});

const Allproduct = mongoose.model('Allproduct', allproductsSchema);

let find = (page, count, callback) => {
  Allproduct.find({}, {_id: 0}, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  }).hint({'id': 1}).sort({'id': 1}).limit(count).skip((page-1)*count)
}

module.exports.find = find;