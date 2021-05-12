const mongoose = require('mongoose');
const mongoUri = 'mongodb://54.176.225.135/product_service';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  family: 4,
})
  .catch((err) => {
    console.log('Error on connect', err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection Successful!');

});

module.exports = db;


// AGGREGATIONS
// Features:

// Aggregate features into an array: features: [{feature: "", value: ""}...]
// db.Features.aggregate([
//   {$group: {_id: "$productId", features:{$push: {feature: "$feature", value: "$value"}}}},
//   {$sort: {_id: 1}}
// ], {allowDiskUse: true})

//Create index for collection by the productId
// db.Features.createIndex({productId: 1})

// Product:

// Combine features array into product table
// db.Product.aggregate([
//   {$lookup: {
//     from: "Features",
//     localField: "id",
//     foreignField: "productId",
//     as: "features"
//   }},
//   {$project: {
//     "_id": 0,
//     "id": 1,
//     "name": 1,
//     "slogan": 1,
//     "description": 1,
//     "category": 1,
//     "default_price": 1,
//     "features.feature": 1,
//     "features.value": 1,
//   }},
//   {$sort: {id: 1}},
//   {$out: {
//     db: "product_service",
//     coll: "products"
//   }}
// ], {allowDiskUse: true})

// Create index for collection by the id (productId)
// db.Product.createIndex({id: 1})

// Style:

// Group Styles by productId (push other fields into an array under results) Creates new collection
// db.Style.aggregate([
//   {
//     $group: {
//       _id: "$productId", results: {
//         $push: {
//           style_id: "$id", name: "$name", original_price: "$original_price",
//           sale_price: {
//             $cond: [{$eq: ["$sale_price", "null"]}, null, "$sale_price"]
//           },
//           "default?":
//             {
//               $cond: [{$eq: ["$default_style", 1]}, true, false]
//             }
//         }
//       }
//     }
//   },
//   {$unwind: "$results"},
//   {$lookup: {
//     from: "Photos",
//     localField: "results.style_id",
//     foreignField: "styleId",
//     as: "results.photos"
//   }},
//   {$lookup: {
//     from: "Skus_grouped_array",
//     localField: "results.style_id",
//     foreignField: "_id",
//     as: "results.skus_grouped"
//   }},
//   {$sort: {_id: 1, "results.style_id": 1}},
//   {
//     $project: {
//       "_id": 1,
//       "results.style_id": 1,
//       "results.name": 1,
//       "results.original_price": 1,
//       "results.sale_price": 1,
//       "results.default?": 1,
//       "results.photos.thumbnail_url": 1,
//       "results.photos.url": 1,
//       "results.skus": {$arrayToObject: {$arrayElemAt: ["$results.skus_grouped.id", 0]}}
//     }
//   },
//   {$group: {_id: "$_id", results: {$push: "$results"}}},
//   {$project: {
//     "_id": 0,
//     "product_id": "$_id",
//     "results": 1
//   }},
//   {$out: {
//     db: "product_service",
//     coll: "Style_aggregated"
//   }}
// ], {allowDiskUse: true}).pretty()

// Create index for collection by the productId
// db.Style.createIndex({productId: 1, "results.style_id": 1, id: 1}, {unique: true, sparse: true})

// Create index for Photos collection by the styleId
// db.Photos.createIndex({styleId: 1}, {unique: true, sparse: true})

// Create index for Skus_grouped_array collection by the _id (styleId)
// db.Skus_grouped_array.createIndex({_id: 1})

// Skus:

// db.Skus.aggregate([
//   {
//     $group: {
//       _id: "$styleId", id: {
//         $push: {
//           "k": {$toString: "$id"}, "v": {quantity: "$quantity", size: "$size"}
//         }
//       }
//     }
//   },
//   {$unwind: "$id"},
//   {$sort: {"id.k": 1}},
//   {$group: {_id: "$_id", id: {$push: "$id"}}},
//   // {$project: {
//   //   "_id": 1,
//   //   "skus": {$arrayToObject: "$id"}
//   // }},
//   {$out: {
//     db: "product_service",
//     coll: "Skus_grouped_array"
//   }}
// ], {allowDiskUse: true}).pretty()

// // Create index for Skus collection by the styleId
// db.Skus.createIndex({styleId: 1})

// Related:

// db.Related.aggregate([
//   {
//     $group: {
//       _id: "$current_product_id",
//     }
//   }
// ])

////////////////////////////////////