var router = require('express').Router();
var Food = require('../../../../models').Food;

router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify('First test!'))
  // var payload = checkBody(req.body);
  // if (payload) {
  //   res.status(400).send(JSON.stringify(payload));
  // } else {
  //   findOrCreateUser(req.body, function(response) {
  //     res.status(response[0]).send(JSON.stringify(response[1]));
  //   });
  // }
});

module.exports = router;
