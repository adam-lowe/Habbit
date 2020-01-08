const usersController = require("express").Router();

// const db = require('../../models');
const Users = require("../../models/user");
const { passport, JWTVerifier } = require("../../lib/passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

usersController.post("/", (req, res) => {
  let { fullName, email, password, pet } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return next(err);
      console.log(hash)
      password = hash; // Or however suits your setup
      // Store the user to the database, then send the response
    });
    Users.create({ fullName, email, password, pet })
    .then(user => {
      console.log(user)
      delete user.password;
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
  });

});

usersController.get("/me", JWTVerifier, (req, res) => {
  delete req.user.password;
  res.json(req.user);
});

usersController.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email }).then(user => {
    if (!user) {
      return res.status(500).send("Server Error");
    }

    if (!user.comparePassword(password)) {
      return res.status(401).send("Unauthorized");
    }
    delete user.password;
    res.json({
      token: jwt.sign({ sub: user._id }, process.env.JWT_SECRET),
      user
    });
  });
});

usersController.put("/me/:id", (req, res) => {
  console.log(req.body);
  Users.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(user => {
      delete user.password;
      res.json(user);
    })
    .catch(err => res.status(422).json(err));
});

module.exports = usersController;
