"use strict";

var tooBusy = require('toobusy-js'),
  Express = require('express'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  expressValidator = require('express-validator'),
  helmet = require('helmet'),
  http = require('http'),
  Router = require('./router'),
  config = require(process.env.MKT_CONFIG_FILE),
  app = new Express();

/**
 * Creates the API Server
 *
 * @constructor
 */
function Server() {

  // configure express js for JSON handling
  app.enable('jsonp callback');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(expressValidator());
  app.use(compress());

  // add basic web security
  app.use(helmet.hsts({
    maxAge: 10886400000,
    includeSubdomains: true,
    preload: true
  }));
  app.use(helmet.xssFilter());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());

  // add busy middleware for overloaded server state
  app.use(function tooBusyMiddleware(req, res, next) {
    tooBusy() ? res.status(503).json({
      "status": "BUSY",
      "message": "Ups :( We're sorry, it seems the server is toobusy right now...please try again later..."
    }) : next();
  });

  app.use('/mkt/', Router.init());
}

/**
 * Starts the HTTP Server
 */
Server.prototype.start = function () {

  http.createServer(app).listen(config.CONSUMER.PORT, config.CONSUMER.HOST, function callback() {
      console.info('MKT Consumer started ...');
    });
};

module.exports = Server;