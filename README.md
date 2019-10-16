# Calorie Tracker
Calorie Tracker was a two person project built in 10 days using Javascript and Express. It includes a frontend that interfaces with this app, and that repo can be found [here](https://github.com/MillsProvosty/calorie-tracker). The goal of this project was to create an Express API given specified endpoints and response formats, as well as integrate both front and back end apps together and complete the quantified self experience while learning JavaScript.

Core Contributors:
Jake Miller
[Jake Miller](https://github.com/Jake0Miller)

Mills Provosty
[Mills Provosty](https://github.com/MillsProvosty)


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

### How to contribute

* Visit https://github.com/MillsProvosty/calorie-tracker-be and click ```New pull request```

A README contains sections such as Introduction, Initial Setup, How to Use, Known Issues, Running Tests, How to Contribute, Core Contributors, Schema Design, and Tech Stack List.

Front End :
Heroku Link : https://calorie-tracker-js.herokuapp.com/


Backend:
Heroku Link : https://calorie-tracker-be.herokuapp.com/


[![Dependabot badge](https://flat.badgen.net/dependabot/wbkd/webpack-starter?icon=dependabot)](https://dependabot.com/)

A lightweight foundation for your next webpack based frontend project.


### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
