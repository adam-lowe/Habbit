const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String, required: true },
  due: { type: String, required: true },
  description: { type: String, required: true }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
  todoSchema
};
