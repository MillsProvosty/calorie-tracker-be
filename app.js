require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var foodRouter = require('./routes/api/v1/foods/foods');
var mealsRouter = require('./routes/api/v1/meals/meals');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/meals', mealsRouter);

module.exports = app;
