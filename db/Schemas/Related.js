const mongoose = require('mongoose');
const db = require('../index.js');

const relatedSchema = new mongoose.Schema({
  id: Number,
  current_product_id: Number,
  related_product_id: Number,
});

const Related = mongoose.model('Related', relatedSchema);

let find = (product_id, callback) => {
  Related.find({current_product_id: product_id}, {_id: 0, id: 0, current_product_id: 0}, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  })
}

module.exports.find = find;