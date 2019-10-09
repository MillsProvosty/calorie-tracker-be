var router = require('express').Router()
var Food = require('../../../../models').Food

/* Returns all food*/
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


/* Returns food accorting to ID*/
router.get('/:id', function(req, res, next) {
  Food.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(food => {
      let payload = ((({ id,name,calories }) => ({ id,name,calories }))(food))
      res.status(200).send(payload)
    })
    .catch(error => res.status(404).send({ error }))
});


module.exports = router
