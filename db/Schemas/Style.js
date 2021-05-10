const mongoose = require('mongoose');
const db = require('../index.js');
const Skus = require('./Skus.js');
const Photos = require('./Photos.js');

const resultsSchema = new mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  "default?": Boolean,
  photos: [Photos.schema],
  skus: {
    type: Object,
    unique: true
  }
});

const styleSchema = new mongoose.Schema({
  product_id: Number,
  results: [resultsSchema]
});

const Style = mongoose.model('Style', styleSchema);

let find = (id, callback) => {
  Style.findOne({product_id: id}, {_id: 0}, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  }).hint({product_id: 1, results: 1})
}

module.exports.find = find;