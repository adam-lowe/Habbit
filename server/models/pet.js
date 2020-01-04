const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: { type: String, required: true },
    hunger: { type: Number, required: true },
    health: { type: Number, required: true },
    boredom: { type: Number, required: true },
    age: { type: Number, required: true }
})

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;