# MKT Consumer

## http://mkt-server.cloudapp.net:3002/mkt/api/v1/messages

Message Consumer. Exposes an endpoint which consumes trade messages.

The endpoint is: http://mkt-server.cloudapp.net:3000/api/v1/messages

This module handles messages by sending them to a Work Queue backed by Redis.

These messages are later processed by another module [mkt-producer](https://github.com/mcmartins/mkt-processor).

**NOTE:** The endpoint is open and no authentication is required (I didn't want to mess with the system you have to test it). In a productive environment the api should be provided over https and should require authentication.
