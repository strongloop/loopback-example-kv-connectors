// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: kv-memory-lb3x

'use strict';

var app = require('../server/server');
var expect = require('./helpers/expect');
var request = require('./helpers/request');

describe('ttl', function() {
  var Color = app.models.Color;

  it('gets TTL when key with unexpired TTL exists', function() {
    return Color.set('red', 1, {ttl: 1000})
      .then(function() {
        return request.get('/api/Colors/red/ttl').expect(200);
      })
      .then(function(res) {
        expect(res.body).to.be.a('number').within(1, 1000);
      });
  });

  it('succeeds when key without TTL exists', function() {
    return Color.set('red', 1)
      .then(function() {
        return request.get('/api/Colors/red/ttl').expect(204);
      })
      .then(function(res) {
        expect(res.body).to.be.empty();
      });
  });

  it('fails when getting TTL for key with expired TTL', function() {
    return Color.set('red', 1, {ttl: 1}).delay(20)
      .then(function() {
        return request.get('/api/Colors/red/ttl').expect(404);
      });
  });

  it('fails when key does not exist', function() {
    return request.get('/api/Colors/blue/ttl').expect(404);
  });
});
