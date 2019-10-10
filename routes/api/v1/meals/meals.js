var router = require('express').Router();
var Food = require('../../../../models').Food;
var Meal = require('../../../../models').Meal;
var MealFoods = require('../../../../models').MealFoods;

/* Returns all meals*/
router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json")
  Meal.findAll( { include: Food } )
  .then( meals => res.status(200).send(JSON.stringify(meals, ['id', 'name', 'Food', 'id', 'name', 'calories'])) )
  .catch( error => res.status(204).send({error}) )
})

/*Returns all food for given meal */
router.get('/:id/foods', function(req, res, next){
  res.setHeader("Content-Type", "application/json")
  Meal.findOne( { where: { id: req.params.id }, attributes: ['id', 'name', 'Food', 'id', 'name', 'calories'] })
  .then( food => (food) ? res.status(200).send(meal) : res.status(404).send() )
  .catch( error => res.status(500).send({error}) )
})


module.exports = router;
