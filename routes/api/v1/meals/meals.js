var router = require('express').Router();
var Meal = require('../../../../models').Meal;
var FoodMeal = require('../../../../models').FoodMeal;

/* Returns all meals*/
router.get('/', function(req, res, next) {
  Meal.findAll( { attributes: ['id', 'name', 'calories'] } )
  .then( meals => res.status(200).send(meals) )
  .catch( error => res.status(500).send({error}) )
})
