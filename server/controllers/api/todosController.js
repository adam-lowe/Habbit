const router = require("express").Router();
const Todo = require("../../models/todo");
const Users = require("../../models/user");
const { JWTVerifier } = require("../../lib/passport");

router.post("/", JWTVerifier, (req, res) => {
  const todos = req.user.todos;
  const newTodo = { ...req.body };
  newTodo.id = todos.length + 1;
  Users.findByIdAndUpdate(
    { _id: req.user._id },
    { new: true, upsert: true, $push: { todos: newTodo } }
  )
    .then(user => {
      delete user.password;
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/complete/:id", JWTVerifier, (req, res) => {
  Users.findById(req.user._id)
    .then(user => {
      const todo = user.todos.id(req.params.id);
      todo.complete = !todo.complete;
      user.points += 5;
      user.save().then(user => {
        delete user.password;
        res.json(user);
      });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
