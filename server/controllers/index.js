const controllers = require('express').Router();

const apiControllers = require('./api');

controllers.use('/api', apiControllers);

controllers.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

module.exports = controllers;
