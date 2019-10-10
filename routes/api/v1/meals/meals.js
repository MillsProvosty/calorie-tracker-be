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


module.exports = router;
