const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res) => {
  db.Todo
    .find()
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.get("/:id", (req, res) => {
  db.Todo
    .findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.post("/", (req, res) => {
  db.Todo
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.put("/:id", (req, res) => {
  db.Todo
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.delete("/:id", (req, res) => {
  db.Todo
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;