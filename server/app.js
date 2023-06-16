var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const routerStart = require('./app/routerStart/roteStart');
const routerItem = require('./app/item/routesItem.js');
const routerCustomer = require('./app/customer/routesCustomer.js');
const routerSales = require('./app/sales/routesSales.js');

const mongoose = require('mongoose');
const mongoDBUrl = 'mongodb://127.0.0.1:27017/inventory-penjualan';

mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Koneksi database berhasil');
  })
  .catch((err) => {
    console.error('Koneksi database gagal:', err);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/images-customer', express.static(path.join(__dirname, 'public/imagesCustomer')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/start', routerStart);
app.use('/api', routerItem);
app.use('/api', routerCustomer);
app.use('/api', routerSales);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
