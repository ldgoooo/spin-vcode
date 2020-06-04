var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require("express-session");

var indexRouter = require('./routes/index');

require("./globals");

var app = express();
const RedisStore = require("connect-redis")(session);


// view engine setup

// 中间件
const response = require("./middleware/response");
const cors = require("./middleware/cors");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// console.log(global.envConfig.redisIp)
// console.log(global.envConfig.redisPort)
// console.log(global.envConfig.redisPWD)
session({
    name: "spin-vcode",
    secret: "vcode",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2
    },
    store: new RedisStore({ client: global.redisClient }),
  })


// 中间件
app.use(response);
app.use(cors);


app.use('/', indexRouter);


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
  // console.log(res)
  res.render('error');
});

module.exports = app;
