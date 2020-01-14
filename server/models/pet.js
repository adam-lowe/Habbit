const { db } = require("../lib/db");
const Schema = db.Schema;

const petSchema = new Schema({
  name: { type: String, required: true },
  health: { type: Number, required: true, default: 100 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Pet = db.model("Pet", petSchema);

module.exports = {
  Pet,
  petSchema
};
