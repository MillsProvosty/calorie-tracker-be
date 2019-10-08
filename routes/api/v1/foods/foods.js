var router = require('express').Router()
var Food = require('../../../../models').Food

router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json")

  Food.findAll()

  .then(foods => res.status(200).send(foods))

  .catch(error => res.status(500).send({ error }))

});

module.exports = router;
