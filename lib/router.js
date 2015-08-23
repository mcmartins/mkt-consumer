"use strict";

var Handler = require('./handler'),
  Express = require('express'),
  router = Express.Router();

/**
 * Creates the API routes: /mkt/api/v?/<resources>/...
 */
module.exports.init = function () {

  router.get('/api/v1', Handler.main);

  router.post('/api/v1/messages', Handler.consumeMessage);

  //router.put('/api/v1/messages/:id', Handler.updateMessage);

  //router.delete('/api/v1/messages/:id', Handler.deleteMessage);

  return router;
};