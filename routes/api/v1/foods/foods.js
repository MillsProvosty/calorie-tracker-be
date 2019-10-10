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
  var name = req.body.food.name
  var cals = req.body.food.calories
  Food.findOne( { where: { name: name } } )
  .then( food => (food) ? res.status(400).send() : Food.create( { name: name, calories: cals } ) )
  .then( food => res.status(200).send(((({ id,name,calories }) => ({ id,name,calories }))(food))) )
  .catch( error => res.status(500).send({error}) )
})

/* Updates existing food */
router.patch('/:id', function(req, res, next) {
  Food.update( req.body.food, { where: {id: req.params.id},
                                returning: true,
                                plain: true} )
  .then( food => res.status(200).send((({ id,name,calories }) => ({ id,name,calories }))(food[1].dataValues)) )
  .catch( error => res.status(400).send({error}) )
});

/* Deletes existing food */
router.delete('/:id', async function(req, res, next) {
  let problems = await FoodMeal.findAll({where: {FoodId: req.params.id},
                                         attributes: ['id']})
  .then( foodMeals => {
    if (foodMeals.length) {
      FoodMeal.destroy({ where: {id: foodMeals.map(it => it.id)} })
    }
  })
  .then( () => Food.destroy({ where: {id: req.params.id} }))
  .then( () => res.status(204).send())
  .catch( error => res.status(404).send({error}))
});

module.exports = router;
