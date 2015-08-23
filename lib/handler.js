"use strict";

var jobQueue = require('./queue').init();

/**
 * Handles POST Requests. Handles messages by adding them to a Work Queue
 *
 * @param req
 * @param res
 */
module.exports.consumeMessage = function (req, res) {
  var message = req.body;
  // TODO validate message before sending to kue
  jobQueue.createJob(message).save().on('succeeded', function (result) {
    res.status(200).send({"status": "OK", "message": result});
  });
};

/**
 * Handles GET Requests by showing the API usage
 *
 * @param req
 * @param res
 */
module.exports.main = function (req, res) {
  res.status(200).send('<h1>Market Trading API</h1><br/><p>Usage:</p><br/><p>> curl -H "Content-Type: application/json" -X POST -d \'{"userId": "134256", "currencyFrom": "EUR", "currencyTo": "GBP", "amountSell": 1000, "amountBuy": 747.10, "rate": 0.7471, "timePlaced" : "24-JAN-15 10:27:44", "originatingCountry" : "FR"}\' http://localhost:3000/mkt/api/v1/messages</p>');
};