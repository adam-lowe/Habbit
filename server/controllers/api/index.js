const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/pets', require('./petsController'));
apiControllers.use('/todos', require('./todosController'));

module.exports = apiControllers;
