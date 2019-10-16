# Calorie Tracker
Calorie Tracker was a two person project built in 10 days using Javascript and Express. It includes a frontend that interfaces with this app, and that repo can be found [here](https://github.com/MillsProvosty/calorie-tracker). The goal of this project was to create an Express API given specified endpoints and response formats, as well as integrate both front and back end apps together and complete the quantified self experience while learning JavaScript.

Core Contributors:

* [Jake Miller](https://github.com/Jake0Miller)
* [Mills Provosty](https://github.com/MillsProvosty)


Schema:
![Schema](/public/images/schema.png)

Foods:
![Foods](/public/images/foods.png)

Meals:
![Meals](/public/images/meals.png)


### Food Endpoints:

* Return All Food:
```
GET https://calorie-tracker-be.herokuapp.com/api/v1/foods
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

Project Board:
![Project Board](https://github.com/MillsProvosty/calorie-tracker/projects/1)

Front End :
Heroku Link : https://calorie-tracker-js.herokuapp.com/


Backend:
Heroku Link : https://calorie-tracker-be.herokuapp.com/


### How to contribute

* Visit https://github.com/MillsProvosty/calorie-tracker-be and click ```New pull request```
