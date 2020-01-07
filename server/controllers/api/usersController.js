const usersController = require('express').Router();

// const db = require('../../models');
const Users = require("../../models/user");
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

usersController.post('/', (req, res) => {
  const { fullName, email, password, pet } = req.body;

  Users.create({ fullName, email, password, pet})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

usersController.get('/me', JWTVerifier, (req, res) => {
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
        user
      });
    });
});

module.exports = usersController;
