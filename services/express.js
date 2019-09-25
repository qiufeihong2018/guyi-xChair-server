/* eslint-disable space-before-function-paren */
'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const config = require('../config')();
const mongo = require('./mongo');
const log = require('./logger').createLogger('express');
const app = express();
var CronJob = require('cron').CronJob;

// 每天0点执行分割方法
const zeroUpdatePipeState = require('../services/pipelineState').zeroUpdatePipeState;

new CronJob('00 00 00 * * *', function () {
  const d = new Date();
  console.log(d);
  zeroUpdatePipeState();
}, null, true);

// // 触发统计方法
// const monitorStatistics = require('../services/statistics').monitorStatistics;
// monitorStatistics();

exports.start = function () {

  app.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

  mongo.connect();

  // Session configuration
  const sess = {
    resave: true,
    saveUninitialized: true,
    secret: 'I am hungry',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  };

  app.use(bodyParser.json()); // For parsing application/json
  // For parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(session(sess)); // Set session middleware

  // passport config
  var User = require('../collections/user');

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use('/api/v1/auth', require('../routers/userAuthentication'));
  app.use('/api/v1/company', require('../routers/company'));
  app.use('/api/v1/pipeline', require('../routers/pipeline'));
  app.use('/api/v1/product', require('../routers/product'));
  app.use('/api/v1/probe', require('../routers/probe'));
  app.use('/api/v1/monitor', require('../routers/monitor'));
  app.use('/api/v1/pipelineState', require('../routers/pipelineState'));
  app.use('/api/v1/statistics', require('../routers/statistics'));


  // start server
  app.set('port', config.expressHttpPort); // Set http port

  app.listen(config.expressHttpPort, () => {
    // 开启端口打印日志
    log.info(`express running on ${config.expressHttpPort} port`);
  });
};