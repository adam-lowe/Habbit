const router = require("express").Router();
const Todo = require("../../models/todo");
const Users = require("../../models/user");
const { JWTVerifier } = require('../../lib/passport');

router.get("/", JWTVerifier, (req, res) => {
  Todo
    .find()
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.get("/:id", JWTVerifier, (req, res) => {
  Todo
    .findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.post("/", JWTVerifier, (req, res) => {
  const todoObj = {
    title: req.body.title,
    due: req.body.due,
    description: req.body.description,
  }
  Todo
    .create(todoObj, JWTVerifier, (err, newTodo) => {
      if (err) {console.log(err)}
      Users.findById(req.body.userID)
      .then(foundUser => {
        foundUser.todo.push(newTodo)
        foundUser.save()
        res.json({newTodo, foundUser})
      })
    })
    // .then(dbModel => res.json(dbModel))
    // .catch(err => res.status(422).json(err));
});

router.put("/:id", JWTVerifier, (req, res) => {
  Todo
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.delete("/:id", JWTVerifier, (req, res) => {

  Todo
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;