var express = require('express');
var router = express.Router();
var products = require('../data/products.json');
var latency = require('../utils/latency');

router.get('/', function(req, res, next) {
  res.contentType('application/json');
  latency(function () {
    res.send(products);
  });
});

module.exports = router;
