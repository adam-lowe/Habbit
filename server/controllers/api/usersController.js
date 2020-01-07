const usersController = require('express').Router();

// const db = require('../../models');
const Users = require("../../models/user");
const {passport, JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

usersController.post('/', (req, res) => {
  const { fullName, email, password, pet } = req.body;
  let newUserPassword = ""

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) return next(err);
      newUserPassword = hash; // Or however suits your setup
      // Store the user to the database, then send the response
      console.log(newUserPassword);
    });
  });

  Users.create({ fullName, email, newUserPassword, pet})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

usersController.get('/me', JWTVerifier, (req, res) => {
  delete req.user.password
  res.json(req.user);
});

usersController.post('/login', (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email })
    .then(user => {
    
      if (!user || !user.comparePassword(password)) {
        return res.status(401).send("Unauthorized");
      }

      

      res.json({
        token: jwt.sign({ sub: user._id }, process.env.JWT_SECRET),
        user: {
          email: user.email,
          fullName: user.fullName,
          _id: user._id,
          todos: user.todos,
          pet: user.pet
        }
      });
    });
});

usersController.put('/me/:id',(req, res) => {
  console.log(req.body);
  Users
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(user => {
      delete user.password;
      res.json(user);
    })
    .catch(err => res.status(422).json(err));

} )

module.exports = usersController;
