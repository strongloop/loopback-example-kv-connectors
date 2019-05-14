// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: extreme-scale-lb2x

'use strict';

var app = require('../server/server');
var expect = require('./helpers/expect');
var Promise = require('bluebird');
var request = require('./helpers/request');

describe('keys', function() {
  var Color = app.models.Color;
  beforeEach(unsetColor);

  it('gets all keys when model exists', function() {
    return Promise.all([
      Color.set('red', 0),
      Color.set('blue', 0),
    ]).then(function() {
      return request.get('/api/Colors/keys').expect(200);
    })
    .then(function(res) {
      expect(res.body.sort()).to.deep.equal(['blue', 'red']);
    });
  });

  it('returns an empty array when model exists with no keys set', function() {
    return request.get('/api/Colors/keys').expect(200)
      .then(function(res) {
        expect(res.body).to.eql([]);
      });
  });

  it('fails when model does not exist', function() {
    return request.get('/api/Model-does-not-exist/keys').expect(404);
  });

  function unsetColor() {
    // FIXME unset implementation needed
    return Promise.all([
      Color.set('red', 0, {ttl: 1}),
      Color.set('blue', 0, {ttl: 1}),
    ]).delay(20);
  }
});
