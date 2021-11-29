const createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



//Mongodb
const url = 'mongodb+srv://user:Au897520@cluster0.ct0tc.mongodb.net/Foodip?retryWrites=true&w=majority';

//Google APIs

const db = require('./database');
//env (change to env later)
const CLIENT_ID = '133885287258-rhrh50r42v8e22oluso9pod1r2jn4ilt.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04RDJyusBTDBBCgYIARAAGAQSNwF-L9Irp4R3rBwLc2TEJun5bGpe8mbKFJ9Hd7-bHSw47NmZGHkFZ8TzJsDCreM_D53xVhXIeZo'

const driveAPI = require('./apis')
const filePath = path.join(__dirname, '/public/images')

//Connect to mongo
db.connectMongoDB(url);


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
