const mongoose = require('mongoose');
const db = require('../index.js');

const skusSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number,
});

const Skus = mongoose.model('Skus', skusSchema);

module.exports.model = Skus;
module.exports.schema = skusSchema;