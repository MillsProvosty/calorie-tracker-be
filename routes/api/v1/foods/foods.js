var router = require('express').Router()
var Food = require('../../../../models').Food

router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json")
  Food.findAll()
  .then(foods => {
    let payload = []
    for (i = 0; i < foods.length; i++) {
      payload.push((({ id,name,calories }) => ({ id,name,calories }))(foods[i]))
    }
    res.status(200).send(JSON.stringify(payload))
  })
  .catch(error => res.status(500).send({ error }))
})

module.exports = router
