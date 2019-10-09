var router = require('express').Router();
var Food = require('../../../../models').Food;

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
                                plain: true
                              })
  .then( food => res.status(200).send((({ id,name,calories }) => ({ id,name,calories }))(food[1].dataValues)))
  .catch( error => res.status(400).send({error}))
});

/* Deletes existing food */
router.delete('/:id', function(req, res, next) {
  Food.destroy( req.body.food, { where: {id: req.params.id}
  })
});


// router.delete('/todos/:id', function(req, res) {
//   var id = req.params.id;
//
//   Todo.remove({'_id': id}, function(err, todo) {
//     if (err) {
//       return res.status(500).json({err: err.message});
//     } else {
//       res.send('Todo was deleted');
//     }
//   });
// });

module.exports = router;
