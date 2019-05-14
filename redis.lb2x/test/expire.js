// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: redis-lb2x

'use strict';

var app = require('../server/server');
var expect = require('./helpers/expect');
var request = require('./helpers/request');

describe('expire', function() {
  var Color = app.models.Color;

  it('sets TTL when key without TTL exists', function() {
    return Color.set('red', 0)
      .then(function() {
        return request.put('/api/Colors/red/expire').send({ttl: 1000})
          .expect(204);
      })
      .then(function() {
        return Color.ttl('red');
      })
      .then(function(ttl) {
        expect(ttl).to.be.a('number').within(1, 1000);
      });
  });

  it('sets TTL when key with unexpired TTL exists', function() {
    return Color.set('red', 1, {ttl: 10000})
      .then(function() {
        return request.put('/api/Colors/red/expire').send({ttl: 1000})
          .expect(204);
      })
      .then(function() {
        return Color.ttl('red');
      })
      .then(function(ttl) {
        expect(ttl).to.be.a('number').within(1, 1000);
      });
  });

  it('fails when setting TTL for key with expired TTL', function() {
    return Color.set('red', 1, {ttl: 1}).delay(20)
      .then(function() {
        return request.put('/api/Colors/red/expire').send({ttl: 1000})
          .expect(404);
      });
  });

  it('fails when key does not exist', function() {
    return request.put('/api/Colors/blue/expire').send({ttl: 1000}).expect(404);
  });
});
