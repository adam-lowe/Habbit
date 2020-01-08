const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: { type: String, required: true },
  health: { type: Number, required: true, default: 100 }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = {
  Pet,
  petSchema
};
