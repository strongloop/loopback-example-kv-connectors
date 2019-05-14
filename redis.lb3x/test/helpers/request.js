// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: redis-lb3x

'use strict';

var app = require('../../server/server');
var supertest = require('supertest');

var request = supertest(app);

module.exports = request;
