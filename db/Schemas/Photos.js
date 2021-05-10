const mongoose = require('mongoose');
const db = require('../index.js');

const photosSchema = new mongoose.Schema({
  styleId: Number,
  url: String,
  thumbnail_url: String,
});

const Photos = mongoose.model('Photos', photosSchema);

module.exports.model = Photos;
module.exports.schema = photosSchema;