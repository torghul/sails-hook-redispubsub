'use strict';

var prepareConnection = require('./prepare-connection');
var bindMethods = require('./redis.pubsub');

module.exports = function onInitialize(app) {
  let isDone = false;
  return function initialize(done) {
    prepareConnection(app, function (err, details) {
      if (err) {
        return done(err);
      }
      // bind methods for app
      bindMethods(app);

      app.log.verbose('Connected to channel: ' + details.channel);
      if(!isDone) {
        isDone = true;
        done();
      }
    });
    app.once('lower', require('./on-lower')(app));
  };
};
