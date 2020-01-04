const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/secrets', require('./secretsController'));
apiControllers.use('/pets', require('./petsController'));
apiControllers.use('/todos', require('./todosController'));

module.exports = apiControllers;
