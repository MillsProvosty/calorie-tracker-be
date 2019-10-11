var router = require('express').Router();
var Food = require('../../../../models').Food;
var Meal = require('../../../../models').Meal;
var FoodMeal = require('../../../../models').FoodMeal;

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
  Meal.findOne( { include: Food, where: {id: req.params.id } } )
  .then( meal => (meal) ? res.status(200).send(JSON.stringify(meal, ['id', 'name', 'Food', 'id', 'name', 'calories'])) : res.status(404).send() )
  .catch( error => res.status(500).send({error}) )
})

router.post('/:mealId/foods/:id', async function(req, res, next){
  res.setHeader("Content-Type", "application/json")
  let food = await Food.findOne( { where: {id: req.params.id} } )
  let meal = await Meal.findOne( { include: Food, where: {id: req.params.mealId} } )

  if (meal && food) {
    let foodMeal = await FoodMeal.findOne( { where: {MealId: meal.id, FoodId: food.id} } )

    if (foodMeal) {
      res.status(400).send(JSON.stringify('Food already in meal.'))
    } else {
      await FoodMeal.create({FoodId: food.id, MealId: meal.id})
      res.status(201).send(JSON.stringify(`Successfully added ${food.name} to ${meal.name}`))
    }
  } else {
    res.status(404).send()
  }
})

/* Deletes food from a meal */
router.delete('/:mealId/foods/:id', async function(req, res, next){
  let food = await Food.findOne( { where: {id: req.params.id} } )
  let meal = await Meal.findOne( { include: Food, where: {id: req.params.mealId} } )

  if (meal && food){
    await FoodMeal.destroy({ where: {FoodId: food.id, MealId: meal.id} })
    res.status(204).send()
  } else {
    res.status(404).send()
  }
})


module.exports = router;
