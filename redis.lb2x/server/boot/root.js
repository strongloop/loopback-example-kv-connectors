// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: redis-lb2x

'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
