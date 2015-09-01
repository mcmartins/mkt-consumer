# MKT Consumer

## Intro

Message Consumer. Exposes an endpoint which consumes trade messages.

This module handles messages by sending them to a Work Queue backed by Redis. These messages are later processed by another module [mkt-processor](https://github.com/mcmartins/mkt-processor).

Node.js is a good solution for handling these requests as it only routes the messages to Redis Queue. Plus, building a webserver in Node.js takes really few line codes. In terms of maturity and performance, Node.js is a good solution. [Ref 1](http://www.hostingadvice.com/blog/nodejs-vs-golang/)

BeeQueue is used as it is a lightweight and performant queue implementation for Node.js. [Ref 2](https://github.com/LewisJEllis/bee-queue)

Redis is holding the Queue and ensuring messages are stored in case of system failure. Redis Sentinel could be used in order to ensure HA. Note that no tunning configurations were implemented [Ref 3](http://shokunin.co/blog/2014/11/11/operational_redis.html)

**NOTE:** The endpoint is open and no authentication is required (I didn't want to mess with the system you have to test it). In a productive environment the api should be provided over https and should require authentication.

## API

### http://mkt-server.cloudapp.net:3002/mkt/api/v1/messages

## Usage

Request: 
```bash
curl -H "Content-Type: application/json" -X POST -d '{"userId": "134256", "currencyFrom": "EUR", "currencyTo": "GBP", "amountSell": 1000, "amountBuy": 747.10, "rate": 0.7471, "timePlaced" : "24-JAN-15 10:27:44", "originatingCountry" : "FR"}' http://mkt-server.cloudapp.net:3002/mkt/api/v1/messages
```

Response:
```bash
{"status":"OK"}
```

In case of server overload, the server fails gracefully by returning HTTP 503:

Response:
```bash
{"status": "BUSY", "message": "Ups :( We're sorry, it seems the server is toobusy right now...please try again later..."}
```
