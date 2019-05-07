// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: extreme-scale-lb2x

'use strict';

var app = require('../server/server');
var expect = require('./helpers/expect');
var request = require('./helpers/request');

describe('get', function() {
  var Color = app.models.Color;

  it('gets value when key exists', function() {
    return Color.set('red', 0)
      .then(function() {
        return request.get('/api/Colors/red').expect(200);
      })
      .then(function(res) {
        expect(res.body).to.equal(0);
      });
  });

  it('fails when key does not exist', function() {
    return request.get('/api/Colors/blue').expect(404);
  });
});
