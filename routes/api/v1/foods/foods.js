var router = require('express').Router();
var Food = require('../../../../models').Food;
var FoodMeal = require('../../../../models').FoodMeal;

/* Returns all food*/
router.get('/', function(req, res, next) {
  Food.findAll( { attributes: ['id', 'name', 'calories'] } )
  .then( foods => res.status(200).send(foods) )
  .catch( error => res.status(500).send({error}) )
})

/* Returns food accorting to ID*/
router.get('/:id', function(req, res, next) {
  Food.findOne( { where: { id: req.params.id }, attributes: ['id', 'name', 'calories'] } )
  .then( food => (food) ? res.status(200).send(food) : res.status(404).send() )
  .catch( error => res.status(500).send({error}) )
})

/* Creates a new food object*/
router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  var name = req.body.food.name
  var cals = req.body.food.calories
  if (name == '' || cals == '') {
    res.status(400).send(JSON.stringify('Name and calories cannot be blank.'))
  } else {
    Food.findOne( { where: { name: name } } )
    .then( food => (food) ? res.status(400).send() : Food.create( { name: name, calories: cals } ) )
    .then( food => res.status(200).send(JSON.stringify(food, ['id', 'name', 'calories'])) )
    .catch( error => res.status(500).send({error}) )
  }
})

/* Updates existing food */
router.patch('/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  Food.update( req.body.food, { where: {id: req.params.id},
                                returning: true,
                                plain: true} )
  .then( food => res.status(200).send(JSON.stringify(food[1].dataValues, ['id', 'name', 'calories'])) )
  .catch( error => res.status(400).send({error}) )
});

/* Deletes existing food */
router.delete('/:id', function(req, res, next) {
  FoodMeal.findAll({where: {FoodId: req.params.id}, attributes: ['id']})
  .then( foodMeals => {
    if (foodMeals.length) {
      res.status(400).send(JSON.stringify('Cannot delete: food exists in meals'))
    } else {
      Food.destroy({ where: {id: req.params.id} })
      .then( () => res.status(204).send())
    }
  })
  .catch( error => res.status(404).send({error}))
});

module.exports = router;
