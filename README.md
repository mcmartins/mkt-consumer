# MKT Consumer

## Intro

Exposes an endpoint which consumes trade messages. This module handles messages by sending them to a Job Queue backed by Redis. These messages are later processed by another module [mkt-processor](https://github.com/mcmartins/mkt-processor). This modularity approach has alot of advantages starting from the separation of concerns, code maintenance, reusability, etc.

Node.js is a good solution for handling these requests as it only routes the messages to Redis Queue. Plus, building a webservice in Node.js takes really few line codes. Node.js asynchronous non-blocking I/O is one of the main advantages. Running in just one thread, whenever an I/O calls happen it does in asynchronous mode and it gets the notification from the operating system using epoll in Linux. So Node.js never waits for the completeness of the I/O calls since its working on event call back mechanism. During this time, it serves for another request. It allocates small heap memory for an event and also does not have many stacks in your memory even in the concurrency level. It scales very well without any overheads. [Ref 1](https://prabhubuzz.wordpress.com/2012/07/17/node-js-event-driven-versus-traditional-multi-thread/)<br/>
Building large applications with Node.js could be a challenge. [Ref 2](http://www.hostingadvice.com/blog/nodejs-vs-golang/)<br/>

BeeQueue is used as it is a lightweight and performant Job Queue implementation for Node.js. For an Operational environment I would implement new functionality mainly for providing more information on the Queue status. [Ref 3](https://github.com/LewisJEllis/bee-queue) By using a Job Queue we are actually abstracting our system. This allows the messages to be later processed by a module implemented in any language of preference.

Redis is holding the Job Queue and ensuring messages are stored in case of system failure. Redis is an open source (BSD licensed), in-memory data structure store, used as database, cache and message broker. [Ref 4](http://redis.io/) Redis Sentinel could be used in order to ensure HA. [Ref 5](http://redis.io/topics/sentinel) Note that no tunning configurations were implemented so the performance can increase using some tweaks. [Ref 6](http://shokunin.co/blog/2014/11/11/operational_redis.html)

Scalability could be achieved by installing NGINX to load-balancing this module. [Ref 7](http://anandmanisankar.com/posts/docker-container-nginx-node-redis-example/)

The endpoint is open and no authentication is required (I didn't want to mess with the system you have to test it). In a productive environment the API should be provided over https and should require authentication.

## API

The API follows a REST approach and could be extended to support other features like - get a specific message, delete a specific message, get user messages, etc. Versioning is also used to explicitly identify the API version. [Ref 8](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)

URL:

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

```bash
{"status": "BUSY", "message": "Ups :( We're sorry, it seems the server is toobusy right now...please try again later..."}
```

## Run

Windows:
```bash
set MKT_CONFIG_FILE=\path\to\config.json&&node mkt-consumer/index.js
```

Linux:
```bash
export MKT_CONFIG_FILE="/path/to/config.json";node mkt-consumer/index.js
```

## Configurations

The configurations file is shared among all the projects and is located in the [mkt-portal](https://github.com/mcmartins/mkt-portal) | [config.json](https://github.com/mcmartins/mkt-portal/blob/master/config.json)
