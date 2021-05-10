const express = require('express');
const db = require('../db/index.js');
const Product = require('../db/Schemas/Product.js');
const Style = require('../db/Schemas/Style.js');
const AllProducts = require('../db/Schemas/AllProducts.js');
const Related = require('../db/Schemas/Related.js');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/products', (req, res) => {
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  AllProducts.find(page, count, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

app.get('/products/:product_id', (req, res) => {
  var id = req.params.product_id;
  Product.find(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.get('/products/:product_id/styles', (req, res) => {
  var id = req.params.product_id;
  Style.find(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.get('/products/:product_id/related', (req, res) => {
  var id = req.params.product_id;
  Related.find(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      var results = [];
      for (var i = 0; i < data.length; i++) {
        results.push(data[i].related_product_id);
      }
      res.send(results);
    }
  })
})

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});