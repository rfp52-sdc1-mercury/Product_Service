const mongoose = require('mongoose');
const db = require('../index.js');

const featuresSchema = new mongoose.Schema({
  id: Number,
  productId: Number,
  feature: String,
  value: String,
});

const Features = mongoose.model('Features', featuresSchema);

module.exports.model = Features;
module.exports.schema = featuresSchema;