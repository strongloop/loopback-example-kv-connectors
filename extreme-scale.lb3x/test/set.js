// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: extreme-scale-lb3x

'use strict';

var app = require('../server/server');
var expect = require('./helpers/expect');
var request = require('./helpers/request');

describe('set operation', function() {
  var Color = app.models.Color;

  it('sets value when key does not exist', function() {
    return Color.set('red', 0, {ttl: 1}).delay(20)
      .then(function() {
        return request.put('/api/Colors/red').send({value: 1}).expect(204);
      })
      .then(function(res) {
        expect(res.body).to.be.empty();
        return Color.get('red');
      })
      .then(function(value) {
        expect(value).to.eql({value: 1});
      });
  });

  it('sets value when key exists', function() {
    return Color.set('red', 0)
      .then(function() {
        return request.put('/api/Colors/red').send({value: 1}).expect(204);
      })
      .then(function(res) {
        expect(res.body).to.be.empty();
        return Color.get('red');
      })
      .then(function(value) {
        expect(value).to.eql({value: 1});
      });
  });
});
