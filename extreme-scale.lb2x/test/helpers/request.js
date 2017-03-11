'use strict';

var app = require('../../server/server');
var supertest = require('supertest');

var request = supertest(app);

module.exports = request;
