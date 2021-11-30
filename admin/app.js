const createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()


//Mongodb

//Google APIs

const db = require('./database');
//env (change to env later)

// const driveAPI = require('./apis')
// const filePath = path.join(__dirname, '/public/images')

//Connect to mongo
db.connectMongoDB(process.env.DB_HOST);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var analyticsRouter = require('./routes/analytics');
var ordersRouter = require('./routes/orders');
var userAccountsRouter = require('./routes/userAccounts');
var stocksRouter = require('./routes/stocks');
var receivedOrdersRouter = require('./routes/receivedOrders');
var adminProfileRouter = require('./routes/adminProfile');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/analytics', analyticsRouter);
app.use('/orders', ordersRouter);
app.use('/userAccounts', userAccountsRouter);
app.use('/stocks', stocksRouter);
app.use('/receivedOrders', receivedOrdersRouter);
app.use('/adminProfile', adminProfileRouter);
app.use('/userAccountId', userAccountsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
