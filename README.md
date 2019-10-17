# Calorie Tracker
Calorie Tracker was a two person project built in 10 days using Javascript and Express. It includes a frontend that interfaces with this app, and that repo can be found [here](https://github.com/MillsProvosty/calorie-tracker). The goal of this project was to create an Express API given specified endpoints and response formats, as well as integrate both front and back end apps together and complete the quantified self experience while learning JavaScript.


Schema:
![Schema](/public/images/schema.png)


### Food Endpoints:

* Return All Food:
```
GET https://calorie-tracker-be.herokuapp.com/api/v1/foods
```
Returns:
```
[{"id":2,"name":"Cherry","calories":77},{"id":6,"name":"Banana","calories":150},{"id":7,"name":"Apple","calories":95},{"id":9,"name":"String Cheese","calories":80},{"id":10,"name":"Black Coffee","calories":1},{"id":11,"name":"Plain Bagel","calories":245},{"id":12,"name":"Steak","calories":679},{"id":13,"name":"Milk","calories":103},{"id":14,"name":"Yogurt","calories":100},{"id":15,"name":"Vanilla Ice Cream","calories":137},{"id":16,"name":"Po-tay-toes","calories":500},{"id":18,"name":"OJ","calories":50},{"id":19,"name":"Alligator","calories":5000},{"id":1,"name":"Cherry","calories":7777777},{"id":8,"name":"Kumquat","calories":14},{"id":4,"name":"Flapjacks","calories":750}]
```

* Return Food by ID:
```
GET https://calorie-tracker-be.herokuapp.com/api/v1/foods/:id
```

* Create Food:
```
POST https://calorie-tracker-be.herokuapp.com/api/v1/foods
```

* Update Food:
```
PUT https://calorie-tracker-be.herokuapp.com/api/v1/foods/:id
```

* Delete Food:
```
DELETE https://calorie-tracker-be.herokuapp.com/api/v1/foods/:id
```

### Meal Endpoints:

* Return all Meals with associated Foods
```
GET https://calorie-tracker-be.herokuapp.com/api/v1/meals
```
Returns:
```
[{"id":1,"name":"Breakfast","Food":[{"id":4,"name":"Flapjacks","calories":750},{"id":18,"name":"OJ","calories":50},{"id":14,"name":"Yogurt","calories":100}]},{"id":2,"name":"Dessert","Food":[{"id":15,"name":"Vanilla Ice Cream","calories":137},{"id":6,"name":"Banana","calories":150}]}]
```

* Return Meal by Id, with associated Foods
```
GET https://calorie-tracker-be.herokuapp.com/api/v1/meals/:meal_id/foods
```

* Add a Food to a Meal
```
PUT https://calorie-tracker-be.herokuapp.com/api/v1/meals/:meal_id/foods/:food_id
```

* Delete a Food from a Meal
```
DELETE https://calorie-tracker-be.herokuapp.com/api/v1/meals/:meal_id/foods/:food_id
```

### Tech Stack:

* Framework: Express v10.16.3
* Language: JavaScript
* Database: PostgreSQL v11.3
* ORM: Sequelize v5.5.1
* Testing: Jest v24.9.0


### Initial Setup:

* `$ git clone https://github.com/MillsProvosty/calorie-tracker-be`
* `$ cd calorie-tracker-be`
* `$ npm install`
* `$ npx sequelize db:create`
* `$ npx sequelize db:migrate`
* `$ npx sequelize db:seed:all`

### Running locally

* Run `npm start`
* Open a window to ```http://localhost:3000``` or postman and enter an endpoint

### Run Test Suite

* `$ npm test`



### Production links:

[Project Board](https://github.com/MillsProvosty/calorie-tracker/projects/1)

[Front End Heroku Link](https://calorie-tracker-js.herokuapp.com/)

[Back End Heroku Link](https://calorie-tracker-be.herokuapp.com/)


### How to contribute

* Visit https://github.com/MillsProvosty/calorie-tracker-be and click ```New pull request```


### Core Contributors:

* [Jake Miller](https://github.com/Jake0Miller)
* [Mills Provosty](https://github.com/MillsProvosty)
