var express = require('express');
var uuid = require('uuid');
var router = express.Router();
var latency = require('../utils/latency');
// initialise with the examples
var compositeProducts = require('../data/compositeProducts.json');

/**
 * @param {string} id 
 */
function getCompositeProduct(id) {
  return compositeProducts.find(a => a.id === id) || null;
}

/**
 * @param {Object} entity 
 */
function addCompositeProduct(entity) {
  entity.id = uuid.v4();
  compositeProducts.push(entity);

  return entity;
}

/**
 * 
 * @param {Object} entity 
 */
function updateCompositeProduct(entity) {
  var index = compositeProducts.findIndex(a => a.id === entity.id);
  compositeProducts[index] = entity;

  return entity;
}

router.get('/', function (req, res, next) {
  res.contentType('application/json');
  latency(function () {
    res.send(compositeProducts);
  });
});

router.get('/:id', function (req, res, next) {
  res.contentType('application/json');

  var data = getCompositeProduct(req.params.id);

  if (!data) {
    req.statusCode(404);
    return req.next();
  }

  latency(function () {
    res.send(data);
  });
});

router.post('/', function (req, res, next) {
  res.contentType('application/json');

  var data = addCompositeProduct(req.body);

  latency(function () {
    res.send(data);
  });
});

router.put('/:id', function (req, res, next) {
  res.contentType('application/json');

  if (!getCompositeProduct(req.params.id)) {
    req.statusCode(404);
    return req.next();
  }

  var data = req.body;
  data.id = req.params.id;

  updateCompositeProduct(data);

  latency(function () {
    res.send(data);
  });
});

module.exports = router;
