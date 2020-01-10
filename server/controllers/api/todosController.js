const router = require("express").Router();
const Todo = require("../../models/todo");
const Users = require("../../models/user");
const { JWTVerifier } = require("../../lib/passport");

router.get("/", JWTVerifier, (req, res) => {
  Users.findById(req.user._id)
    .then(user => res.json(user.todos))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", JWTVerifier, (req, res) => {
  Todo.findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.post("/", JWTVerifier, (req, res) => {
  const todos = req.user.todos;
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  Users.updateOne({ _id: req.user._id }, req.user)
    .then(user => {
      delete user.password;
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", JWTVerifier, (req, res) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.delete("/:id", JWTVerifier, (req, res) => {
  Todo.findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
